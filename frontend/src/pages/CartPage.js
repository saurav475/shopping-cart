import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { formatPrice } from '../utils/helpers';
import { FaTrash } from 'react-icons/fa';
import '../styles/pages.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, loading, error, fetchCart, updateCartItem, removeFromCart, clearCart, cartTotal } =
    useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [isAuthenticated, navigate, fetchCart]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(productId, newQuantity);
    } catch (err) {
      console.error('Failed to update cart', err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (err) {
      console.error('Failed to remove item', err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        {error && <Alert type="danger" message={error} />}

        {!cart || cart.items.length === 0 ? (
          <div className="empty-cart card text-center mt">
            <div className="card-body">
              <h3>Your cart is empty</h3>
              <p>Start shopping to add items to your cart</p>
              <button className="btn btn-primary mt" onClick={() => navigate('/')}>
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-container grid grid-2 gap-2">
            <div className="cart-items">
              <div className="card">
                <div className="card-header">
                  <h3>Items ({cart.items.length})</h3>
                </div>
                <div className="card-body">
                  {cart.items.map((item) => (
                    <div key={item.product._id} className="cart-item card mb">
                      <div className="flex gap gap-2">
                        <img
                          src={item.product.image || '/placeholder.jpg'}
                          alt={item.product.name}
                          className="cart-item-image"
                        />
                        <div className="item-details flex-column flex-1">
                          <h4>{item.product.name}</h4>
                          <p className="text-muted">{item.product.category}</p>
                          <div className="item-price">
                            {item.product.discount > 0 && (
                              <del className="text-muted">
                                {formatPrice(item.product.price)}
                              </del>
                            )}
                            <span className="font-bold">
                              {formatPrice(item.product.price - (item.product.price * item.product.discount) / 100)}
                            </span>
                          </div>
                        </div>
                        <div className="item-controls">
                          <div className="quantity-control">
                            <button
                              onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input type="number" value={item.quantity} readOnly />
                            <button
                              onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveItem(item.product._id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="cart-summary">
              <div className="card">
                <div className="card-header">
                  <h3>Order Summary</h3>
                </div>
                <div className="card-body">
                  <div className="summary-row flex-between mb">
                    <span>Subtotal:</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="summary-row flex-between mb">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="summary-row flex-between mb">
                    <span>Tax:</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <hr />
                  <div className="summary-row flex-between mb" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    <span>Total:</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate('/checkout')}
                    style={{ width: '100%' }}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="btn btn-secondary btn-lg mt"
                    onClick={() => navigate('/')}
                    style={{ width: '100%' }}
                  >
                    Continue Shopping
                  </button>
                  <button
                    className="btn btn-danger btn-sm mt"
                    onClick={clearCart}
                    style={{ width: '100%' }}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
