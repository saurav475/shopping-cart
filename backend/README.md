# Shopping Cart Backend

Express.js backend for the Shopping Cart application with MongoDB.

## Features

- User authentication with JWT
- Product management (CRUD)
- Shopping cart functionality
- Order management
- Admin features for order status and refunds
- Input validation and error handling
- RESTful API design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with pagination, filtering)
- `GET /api/products/categories` - Get all categories
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `PUT /api/orders/:id/refund` - Refund order (Admin only)

## Project Structure

```
backend/
├── src/
│   ├── models/          # Database models
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, error handling
│   ├── validators/      # Input validation
│   ├── utils/           # Helper functions
│   └── server.js        # Main server file
├── package.json
└── .env.example
```

## Best Practices Implemented

✅ **Security**
- Password hashing with bcrypt
- JWT authentication
- Input validation and sanitization
- CORS enabled
- Helmet for HTTP headers

✅ **Performance**
- Database indexing
- Pagination for large datasets
- Request timeout handling
- Efficient queries

✅ **Code Quality**
- Async/await error handling
- Consistent error responses
- Clean separation of concerns
- Input validation middleware

✅ **Data Management**
- Proper stock management
- Order tracking
- Automatic order number generation
- Timestamp tracking

## Error Handling

The API returns consistent error responses:
```json
{
  "message": "Error description",
  "errors": []
}
```

## Testing

Create test admin user:
```
Email: admin@test.com
Password: admin123
Role: admin
```

Create test customer:
```
Email: customer@test.com
Password: customer123
Role: customer
```

## License

MIT
