import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../utils/apiService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { usePagination } from '../hooks/useCommon';
import '../styles/pages.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { page, limit, nextPage, prevPage, goToPage } = usePagination(1, 12);
  const [totalPages, setTotalPages] = useState(1);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          productAPI.getAll({
            page,
            limit,
            category: selectedCategory,
            search: searchQuery,
          }),
          productAPI.getCategories(),
        ]);

        setProducts(productsRes.data.products);
        setTotalPages(productsRes.data.pagination.pages);
        setCategories(categoriesRes.data);
      } catch (err) {
        setAlert({ type: 'danger', message: 'Failed to fetch products' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, selectedCategory, searchQuery]);

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await addToCart(productId, 1);
      setAlert({ type: 'success', message: 'Product added to cart!' });
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to add to cart' });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="home-page">
      <div className="container">
        {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

        <div className="search-section card">
          <div className="card-body">
            <div className="search-filters grid grid-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  goToPage(1);
                }}
                className="form-control"
              />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  goToPage(1);
                }}
                className="form-control"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="no-products text-center mt">
            <h3>No products found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            <div className="products-grid grid grid-4 mt">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination flex-center gap-2 mt-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={prevPage}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <div className="page-info">
                  Page {page} of {totalPages}
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={nextPage}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
