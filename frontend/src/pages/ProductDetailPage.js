import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../utils/apiService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { formatPrice } from '../utils/helpers';
import '../styles/pages.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getById(id);
        setProduct(response.data);
      } catch (err) {
        setAlert({ type: 'danger', message: 'Failed to fetch product' });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await addToCart(id, quantity);
      setAlert({ type: 'success', message: 'Product added to cart!' });
      setQuantity(1);
    } catch (err) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to add to cart' });
    }
  };

  if (loading) return <Loading />;
  if (!product)
    return (
      <div className="container mt">
        <Alert type="danger" message="Product not found" />
      </div>
    );

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="product-detail-page">
      <div className="container">
        {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

        <button className="btn btn-secondary mb" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="product-detail card">
          <div className="detail-grid grid grid-2">
            <div className="product-image-section">
              <img src={product.image || '/placeholder.jpg'} alt={product.name} />
            </div>

            <div className="product-info">
              <h1>{product.name}</h1>
              <p className="category text-muted">{product.category}</p>

              <div className="price-section">
                {product.discount > 0 && (
                  <>
                    <del className="original-price">{formatPrice(product.price)}</del>
                    <span className="discount-label">{product.discount}% OFF</span>
                  </>
                )}
                <h2 className="current-price">{formatPrice(discountedPrice)}</h2>
              </div>

              <div className="rating-section">
                <span>⭐ {product.rating || 'N/A'}</span>
                <span className="reviews">({product.totalReviews} reviews)</span>
              </div>

              <div className="stock-section">
                <p className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                  Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}
                </p>
              </div>

              <div className="description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="action-section">
                <div className="quantity-control">
                  <label>Quantity:</label>
                  <div className="quantity-input">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input type="number" value={quantity} readOnly />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
