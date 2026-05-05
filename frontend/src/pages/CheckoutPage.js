import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useCommon';
import { orderAPI } from '../utils/apiService';
import Alert from '../components/Alert';
import '../styles/pages.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!cart || cart.items.length === 0) {
      navigate('/cart');
      return;
    }
  }, [isAuthenticated, cart, navigate]);

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      postalCode: user?.address?.postalCode || '',
      country: user?.address?.country || '',
    },
    async (formData) => {
      try {
        setSubmitting(true);
        const orderData = {
          items: cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          shippingAddress: formData,
        };

        const response = await orderAPI.create(orderData);
        setAlert({ type: 'success', message: 'Order placed successfully!' });
        
        // Clear cart
        await clearCart();
        
        // Redirect to order detail
        setTimeout(() => {
          navigate(`/orders/${response.data.order._id}`);
        }, 2000);
      } catch (err) {
        setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to place order' });
        setSubmitting(false);
      }
    }
  );

  if (!isAuthenticated || !cart) return null;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

        <div className="checkout-container grid grid-2 gap-2 mt">
          <div className="checkout-form">
            <div className="card">
              <div className="card-header">
                <h3>Shipping Address</h3>
              </div>
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-group">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    name="street"
                    className="form-control"
                    value={values.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.street && <div className="error-text">{errors.street}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.city && <div className="error-text">{errors.city}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.state && <div className="error-text">{errors.state}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    className="form-control"
                    value={values.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.postalCode && <div className="error-text">{errors.postalCode}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.country && <div className="error-text">{errors.country}</div>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                  disabled={submitting}
                >
                  {submitting ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          <div className="order-summary">
            <div className="card">
              <div className="card-header">
                <h3>Order Summary</h3>
              </div>
              <div className="card-body">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="summary-item flex-between mb">
                    <div>
                      <p className="font-bold">{item.product.name}</p>
                      <p className="text-muted">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p>
                        ${(
                          (item.product.price -
                            (item.product.price * item.product.discount) / 100) *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <hr className="my-2" />

                <div className="flex-between mb">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex-between mb">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex-between mb">
                  <span>Tax:</span>
                  <span>Calculated</span>
                </div>

                <hr className="my-2" />

                <div className="flex-between" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
