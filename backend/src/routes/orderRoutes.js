const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  refundOrder,
  cancelOrder,
} = require('../controllers/orderController');
const { auth, adminOnly } = require('../middleware/auth');
const { validateCreateOrder } = require('../validators');

// Customer routes
router.post('/', auth, validateCreateOrder, createOrder);
router.get('/my-orders', auth, getMyOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/cancel', auth, cancelOrder);

// Admin routes
router.get('/', auth, adminOnly, getAllOrders);
router.put('/:id/status', auth, adminOnly, updateOrderStatus);
router.put('/:id/refund', auth, adminOnly, refundOrder);

module.exports = router;
