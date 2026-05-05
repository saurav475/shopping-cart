const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require('../controllers/productController');
const { auth, adminOnly } = require('../middleware/auth');
const { validateCreateProduct, validateUpdateProduct } = require('../validators');

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);

// Admin routes
router.post('/', auth, adminOnly, validateCreateProduct, createProduct);
router.put('/:id', auth, adminOnly, validateUpdateProduct, updateProduct);
router.delete('/:id', auth, adminOnly, deleteProduct);

module.exports = router;
