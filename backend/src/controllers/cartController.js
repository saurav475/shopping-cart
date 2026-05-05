const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart
const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ customer: req.userId }).populate('items.product');

    if (!cart) {
      cart = new Cart({ customer: req.userId, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// Add item to cart
const addToCart = async (req, res, next) => {
  try {
    const { product: productId, quantity } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Available: ${product.stock}`,
      });
    }

    let cart = await Cart.findOne({ customer: req.userId });

    if (!cart) {
      cart = new Cart({
        customer: req.userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if product already in cart
      const existingItem = cart.items.find((item) => item.product.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;

        // Validate stock
        if (product.stock < existingItem.quantity) {
          return res.status(400).json({
            message: `Insufficient stock. Available: ${product.stock}`,
          });
        }
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      message: 'Item added to cart',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// Update cart item
const updateCartItem = async (req, res, next) => {
  try {
    const { product: productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    // Validate product and stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Available: ${product.stock}`,
      });
    }

    const cart = await Cart.findOne({ customer: req.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    res.json({
      message: 'Cart item updated',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// Remove item from cart
const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ customer: req.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    await cart.populate('items.product');

    res.json({
      message: 'Item removed from cart',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// Clear cart
const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { customer: req.userId },
      { items: [] },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json({
      message: 'Cart cleared',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
