import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../utils/apiService';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { formatPrice, formatDate } from '../utils/helpers';
import '../styles/pages.css';

const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [isAdmin, navigate, page, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAllOrders({
        page,
        limit: 20,
        status: statusFilter,
      });
      setOrders(response.data.orders);
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to fetch orders' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, { status: newStatus });
      setAlert({ type: 'success', message: 'Order status updated' });
      fetchOrders();
      if (selectedOrder?._id === orderId) {
        const updated = await orderAPI.getById(orderId);
        setSelectedOrder(updated.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to update status' });
    }
  };

  const handleRefund = async (orderId) => {
    if (!window.confirm('Are you sure you want to refund this order?')) return;

    try {
      await orderAPI.refund(orderId);
      setAlert({ type: 'success', message: 'Order refunded successfully' });
      fetchOrders();
      if (selectedOrder?._id === orderId) {
        const updated = await orderAPI.getById(orderId);
        setSelectedOrder(updated.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to refund order' });
    }
  };

  if (loading) return <Loading />;

  const statusColors = {
    pending: 'warning',
    confirmed: 'info',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'danger',
    refunded: 'danger',
  };

  return (
    <div className="admin-orders-page">
      <div className="container">
        <h1>Manage Orders</h1>

        {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

        {selectedOrder ? (
          <div className="order-detail card mt">
            <div className="card-header flex-between">
              <h3>Order: {selectedOrder.orderNumber}</h3>
              <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>
                Back
              </button>
            </div>

            <div className="card-body">
              <div className="order-info grid grid-2 gap-2 mb-2">
                <div>
                  <p>
                    <strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}
                  </p>
                  <p>
                    <strong>Customer:</strong> {selectedOrder.customer.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedOrder.customer.email}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Shipping Address:</strong>
                  </p>
                  <p>
                    {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}
                    <br />
                    {selectedOrder.shippingAddress.state}{' '}
                    {selectedOrder.shippingAddress.postalCode}
                    <br />
                    {selectedOrder.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div className="mb-2">
                <h4>Order Status</h4>
                <div className="flex gap">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                    className="form-control"
                    style={{ width: '200px' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {selectedOrder.status !== 'refunded' && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRefund(selectedOrder._id)}
                    >
                      Refund
                    </button>
                  )}
                </div>
              </div>

              <div className="order-items mb-2">
                <h4>Items</h4>
                {selectedOrder.items.map((item) => (
                  <div key={item._id} className="flex-between card mb">
                    <div>
                      <p className="font-bold">{item.product.name}</p>
                      <p className="text-muted">SKU: {item.product.sku}</p>
                    </div>
                    <div className="text-right">
                      <p>Qty: {item.quantity}</p>
                      <p>{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <h4>Total Amount: {formatPrice(selectedOrder.totalAmount)}</h4>
                {selectedOrder.refundAmount > 0 && (
                  <p className="text-danger">Refunded: {formatPrice(selectedOrder.refundAmount)}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="orders-list mt">
            <div className="filter-section card mb">
              <div className="card-body">
                <label className="form-label">Filter by Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="form-control"
                >
                  <option value="">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>

            <div className="orders-table card">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.customer.name}</td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>{formatPrice(order.totalAmount)}</td>
                        <td>
                          <span
                            className={`badge badge-${statusColors[order.status] || 'secondary'}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
