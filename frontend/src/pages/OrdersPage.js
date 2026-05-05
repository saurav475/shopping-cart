import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../utils/apiService';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { formatPrice, formatDate } from '../utils/helpers';
import '../styles/pages.css';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getMyOrders({ page, limit: 10 });
        setOrders(response.data.orders);

        // If viewing specific order, fetch it
        if (id) {
          const orderRes = await orderAPI.getById(id);
          setSelectedOrder(orderRes.data);
        }
      } catch (err) {
        setAlert({ type: 'danger', message: 'Failed to fetch orders' });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate, page, id]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    try {
      await orderAPI.cancel(orderId);
      setAlert({ type: 'success', message: 'Order cancelled successfully' });
      // Refresh orders
      const response = await orderAPI.getMyOrders({ page, limit: 10 });
      setOrders(response.data.orders);
      if (selectedOrder?._id === orderId) {
        const updatedOrder = await orderAPI.getById(orderId);
        setSelectedOrder(updatedOrder.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to cancel order' });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>

        {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

        {selectedOrder ? (
          <div className="order-detail card mt">
            <div className="card-header flex-between">
              <h3>Order Details: {selectedOrder.orderNumber}</h3>
              <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>
                Back to Orders
              </button>
            </div>

            <div className="card-body">
              <div className="order-info grid grid-2 gap-2 mb-2">
                <div>
                  <p>
                    <strong>Order Number:</strong> {selectedOrder.orderNumber}
                  </p>
                  <p>
                    <strong>Date:</strong> {formatDate(selectedOrder.createdAt)}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`badge badge-${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Shipping Address:</strong>
                  </p>
                  <p>
                    {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}
                    <br />
                    {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                    <br />
                    {selectedOrder.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div className="order-items mb-2">
                <h4>Order Items</h4>
                {selectedOrder.items.map((item) => (
                  <div key={item._id} className="item-row flex-between card mb">
                    <div className="flex gap">
                      <img src={item.product.image || '/placeholder.jpg'} alt={item.product.name} />
                      <div>
                        <p className="font-bold">{item.product.name}</p>
                        <p className="text-muted">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <h4>Order Total: {formatPrice(selectedOrder.totalAmount)}</h4>
              </div>

              {selectedOrder.status === 'pending' || selectedOrder.status === 'confirmed' ? (
                <button
                  className="btn btn-danger"
                  onClick={() => handleCancelOrder(selectedOrder._id)}
                >
                  Cancel Order
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="orders-list mt">
            {orders.length === 0 ? (
              <div className="empty-orders card text-center">
                <div className="card-body">
                  <h3>No orders yet</h3>
                  <p>Start shopping to place your first order</p>
                  <button className="btn btn-primary mt" onClick={() => navigate('/')}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-1">
                {orders.map((order) => (
                  <div key={order._id} className="order-card card">
                    <div
                      className="card-body"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex-between">
                        <div>
                          <h4>{order.orderNumber}</h4>
                          <p className="text-muted">{formatDate(order.createdAt)}</p>
                          <p>
                            Items: {order.items.length} | Total: {formatPrice(order.totalAmount)}
                          </p>
                        </div>
                        <span className={`badge badge-${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function getStatusColor(status) {
  const colors = {
    pending: 'warning',
    confirmed: 'info',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'danger',
    refunded: 'danger',
  };
  return colors[status] || 'secondary';
}

export default OrdersPage;
