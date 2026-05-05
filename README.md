<<<<<<< HEAD
# Shopping Cart Application

A full-stack e-commerce shopping cart application built with React.js and MongoDB. Features a responsive UI, complete product catalog, secure checkout, and comprehensive admin dashboard.

## 🎯 Features

### Customer Features
- ✅ Browse products with search and filtering
- ✅ View detailed product information
- ✅ Add/remove items from shopping cart
- ✅ Secure checkout process
- ✅ Order tracking and history
- ✅ User profile management
- ✅ Responsive design for all devices

### Admin Features
- ✅ Product management (CRUD operations)
- ✅ Inventory management
- ✅ View all orders
- ✅ Update order status
- ✅ Process refunds
- ✅ Cancel orders
- ✅ Order filtering and search

### Technical Features
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ RESTful API design
- ✅ Input validation
- ✅ Error handling
- ✅ Database indexing for performance
- ✅ Responsive and optimized UI
- ✅ State management with React Context

## 📋 Project Structure

```
shopping-cart/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── models/            # MongoDB schemas
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth, error handling
│   │   ├── validators/        # Input validation
│   │   └── utils/             # Helpers
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Helpers & API calls
│   │   └── styles/            # CSS files
│   ├── public/
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure MongoDB connection and JWT secret in `.env`

5. Start the server:
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Ensure `REACT_APP_API_URL` points to your backend

5. Start the application:
```bash
npm start
```

Frontend runs on: `http://localhost:3000`

## 🔧 Configuration

### Backend Environment Variables
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
```

### Frontend Environment Variables
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - List products (with pagination)
- `GET /api/products/categories` - Get categories
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add item
- `PUT /api/cart/update` - Update item
- `DELETE /api/cart/:productId` - Remove item
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update status (Admin)
- `PUT /api/orders/:id/refund` - Refund order (Admin)

## 🎨 Frontend Pages

### Public Pages
- `/` - Home/Products listing
- `/product/:id` - Product details
- `/login` - User login
- `/register` - User registration

### Customer Pages
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/orders` - Order history
- `/orders/:id` - Order details
- `/profile` - User profile

### Admin Pages
- `/admin/products` - Product management
- `/admin/orders` - Order management

## 🔐 Authentication & Authorization

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Customer/Admin)
- Protected routes on frontend
- Token refresh mechanism

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 768px, 1200px
- Optimized for all screen sizes
- Touch-friendly interface
- Fast loading on mobile networks

## 🧪 Testing

### Test Admin Account
```
Email: admin@test.com
Password: admin123
```

### Test Customer Account
```
Email: customer@test.com
Password: customer123
```

## 🚢 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables in platform
2. Deploy with Git
3. Ensure MongoDB connection

### Frontend Deployment (Vercel/Netlify)
1. Set `REACT_APP_API_URL` in platform
2. Deploy with Git
3. Configure build settings

## 📈 Performance Optimizations

- Database indexing on frequently queried fields
- Pagination for large datasets
- Image optimization
- Code splitting in React
- Efficient state management
- API request caching where applicable
- Request debouncing for search

## 🛡️ Security Features

- HTTPS ready
- CORS configuration
- SQL injection prevention (MongoDB)
- XSS protection
- CSRF protection
- Rate limiting ready
- Password hashing
- JWT authentication
- Input validation

## 📝 Best Practices

✅ RESTful API design
✅ Clean code architecture
✅ Error handling and logging
✅ Input validation
✅ Security best practices
✅ Performance optimization
✅ Responsive design
✅ Component reusability
✅ Code documentation
✅ Database optimization

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and conventions.

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 💡 Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Email notifications
- Product reviews and ratings
- Wishlist feature
- Coupon/discount codes
- Advanced search and filters
- Product recommendations
- Analytics dashboard
- Multi-language support
- Real-time notifications

## 📞 Support

For issues or questions, please open an issue on GitHub.

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [JWT Authentication](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)

---

**Happy Coding! 🚀**
=======
# Shopping Cart Application

A full-stack e-commerce shopping cart application built with React.js and MongoDB. Features a responsive UI, complete product catalog, secure checkout, and comprehensive admin dashboard.

## 🎯 Features

### Customer Features
- ✅ Browse products with search and filtering
- ✅ View detailed product information
- ✅ Add/remove items from shopping cart
- ✅ Secure checkout process
- ✅ Order tracking and history
- ✅ User profile management
- ✅ Responsive design for all devices

### Admin Features
- ✅ Product management (CRUD operations)
- ✅ Inventory management
- ✅ View all orders
- ✅ Update order status
- ✅ Process refunds
- ✅ Cancel orders
- ✅ Order filtering and search

### Technical Features
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ RESTful API design
- ✅ Input validation
- ✅ Error handling
- ✅ Database indexing for performance
- ✅ Responsive and optimized UI
- ✅ State management with React Context

## 📋 Project Structure

```
shopping-cart/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── models/            # MongoDB schemas
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth, error handling
│   │   ├── validators/        # Input validation
│   │   └── utils/             # Helpers
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Helpers & API calls
│   │   └── styles/            # CSS files
│   ├── public/
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure MongoDB connection and JWT secret in `.env`

5. Start the server:
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Ensure `REACT_APP_API_URL` points to your backend

5. Start the application:
```bash
npm start
```

Frontend runs on: `http://localhost:3000`

## 🔧 Configuration

### Backend Environment Variables
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
```

### Frontend Environment Variables
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - List products (with pagination)
- `GET /api/products/categories` - Get categories
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add item
- `PUT /api/cart/update` - Update item
- `DELETE /api/cart/:productId` - Remove item
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update status (Admin)
- `PUT /api/orders/:id/refund` - Refund order (Admin)

## 🎨 Frontend Pages

### Public Pages
- `/` - Home/Products listing
- `/product/:id` - Product details
- `/login` - User login
- `/register` - User registration

### Customer Pages
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/orders` - Order history
- `/orders/:id` - Order details
- `/profile` - User profile

### Admin Pages
- `/admin/products` - Product management
- `/admin/orders` - Order management

## 🔐 Authentication & Authorization

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Customer/Admin)
- Protected routes on frontend
- Token refresh mechanism

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 768px, 1200px
- Optimized for all screen sizes
- Touch-friendly interface
- Fast loading on mobile networks

## 🧪 Testing

### Test Admin Account
```
Email: admin@test.com
Password: admin123
```

### Test Customer Account
```
Email: customer@test.com
Password: customer123
```

## 🚢 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables in platform
2. Deploy with Git
3. Ensure MongoDB connection

### Frontend Deployment (Vercel/Netlify)
1. Set `REACT_APP_API_URL` in platform
2. Deploy with Git
3. Configure build settings

## 📈 Performance Optimizations

- Database indexing on frequently queried fields
- Pagination for large datasets
- Image optimization
- Code splitting in React
- Efficient state management
- API request caching where applicable
- Request debouncing for search

## 🛡️ Security Features

- HTTPS ready
- CORS configuration
- SQL injection prevention (MongoDB)
- XSS protection
- CSRF protection
- Rate limiting ready
- Password hashing
- JWT authentication
- Input validation

## 📝 Best Practices

✅ RESTful API design
✅ Clean code architecture
✅ Error handling and logging
✅ Input validation
✅ Security best practices
✅ Performance optimization
✅ Responsive design
✅ Component reusability
✅ Code documentation
✅ Database optimization

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and conventions.

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 💡 Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Email notifications
- Product reviews and ratings
- Wishlist feature
- Coupon/discount codes
- Advanced search and filters
- Product recommendations
- Analytics dashboard
- Multi-language support
- Real-time notifications

## 📞 Support

For issues or questions, please open an issue on GitHub.

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [JWT Authentication](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)

---

**Happy Coding! 🚀**
>>>>>>> 62fd90be2eccb936805075527a7a8436f943ddaf
