import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';
import '../styles/productCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const hasDiscount = product.discount > 0;

  return (
    <div className="product-card card">
      <div className="product-image">
        <img src={product.image || '/placeholder.jpg'} alt={product.name} />
        {hasDiscount && <span className="discount-badge">{product.discount}%</span>}
        {product.stock === 0 && <span className="out-of-stock">Out of Stock</span>}
      </div>
      <div className="card-body">
        <h3 className="product-name">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <p className="product-category text-muted">{product.category}</p>
        <div className="product-price flex-between">
          <div>
            {hasDiscount && <del className="original-price">{formatPrice(product.price)}</del>}
            <span className="current-price">{formatPrice(discountedPrice)}</span>
          </div>
          <span className="rating">★ {product.rating || 'N/A'}</span>
        </div>
        <p className="stock text-muted">Stock: {product.stock}</p>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onAddToCart(product._id)}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
