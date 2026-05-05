<<<<<<< HEAD
# API Reference Guide

## Base URL
```
http://localhost:5000/api
```

## Authentication
Include JWT token in header for protected routes:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"  // optional, defaults to "customer"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": { user_object }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { user_object }
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response:
{
  "user": { user_object }
}
```

### Update Profile
```
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  }
}

Response:
{
  "message": "Profile updated successfully",
  "user": { updated_user_object }
}
```

---

## 🛍️ Product Endpoints

### Get All Products
```
GET /products?page=1&limit=12&category=electronics&search=laptop&sort=-createdAt

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 12)
- category: Filter by category
- search: Search term
- sort: Sort field (use - for descending)

Response:
{
  "products": [ product_objects ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 12,
    "pages": 9
  }
}
```

### Get Product by ID
```
GET /products/:id

Response:
{
  "product": { product_object }
}
```

### Get Categories
```
GET /products/categories

Response:
{
  "categories": ["electronics", "clothing", "books"]
}
```

### Create Product (Admin Only)
```
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "category": "electronics",
  "price": 999.99,
  "stock": 50,
  "sku": "LAPTOP-001",
  "image": "image_url",
  "discount": 10
}

Response:
{
  "message": "Product created successfully",
  "product": { product_object }
}
```

### Update Product (Admin Only)
```
PUT /products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Laptop",
  "price": 899.99,
  "stock": 45,
  "discount": 15
}

Response:
{
  "message": "Product updated successfully",
  "product": { updated_product_object }
}
```

### Delete Product (Admin Only)
```
DELETE /products/:id
Authorization: Bearer <token>

Response:
{
  "message": "Product deleted successfully",
  "product": { product_object }
}
```

---

## 🛒 Cart Endpoints

### Get Cart
```
GET /cart
Authorization: Bearer <token>

Response:
{
  "cart": {
    "_id": "cart_id",
    "customer": "user_id",
    "items": [
      {
        "product": { product_object },
        "quantity": 2
      }
    ],
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

### Add to Cart
```
POST /cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "product": "product_id",
  "quantity": 2
}

Response:
{
  "message": "Item added to cart",
  "cart": { cart_object }
}
```

### Update Cart Item
```
PUT /cart/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "product": "product_id",
  "quantity": 5
}

Response:
{
  "message": "Cart item updated",
  "cart": { cart_object }
}
```

### Remove Item from Cart
```
DELETE /cart/:productId
Authorization: Bearer <token>

Response:
{
  "message": "Item removed from cart",
  "cart": { cart_object }
}
```

### Clear Cart
```
DELETE /cart
Authorization: Bearer <token>

Response:
{
  "message": "Cart cleared",
  "cart": { empty_cart_object }
}
```

---

## 📦 Order Endpoints

### Create Order
```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  }
}

Response:
{
  "message": "Order created successfully",
  "order": { order_object }
}
```

### Get My Orders
```
GET /orders/my-orders?page=1&limit=10&status=pending
Authorization: Bearer <token>

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- status: Filter by status (pending, confirmed, shipped, delivered, cancelled, refunded)

Response:
{
  "orders": [ order_objects ],
  "pagination": { pagination_object }
}
```

### Get Order by ID
```
GET /orders/:id
Authorization: Bearer <token>

Response:
{
  "order": { order_object }
}
```

### Cancel Order
```
PUT /orders/:id/cancel
Authorization: Bearer <token>

Response:
{
  "message": "Order cancelled successfully",
  "order": { updated_order_object }
}
```

---

## 👑 Admin Order Endpoints

### Get All Orders
```
GET /orders?page=1&limit=20&status=pending
Authorization: Bearer <admin_token>

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 20)
- status: Filter by status

Response:
{
  "orders": [ order_objects ],
  "pagination": { pagination_object }
}
```

### Update Order Status (Admin Only)
```
PUT /orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "shipped",
  "notes": "Order shipped with FedEx"
}

Status Values:
- pending
- confirmed
- shipped
- delivered
- cancelled
- refunded

Response:
{
  "message": "Order status updated successfully",
  "order": { updated_order_object }
}
```

### Refund Order (Admin Only)
```
PUT /orders/:id/refund
Authorization: Bearer <admin_token>

Response:
{
  "message": "Order refunded successfully",
  "order": { updated_order_object }
}
```

---

## 📊 Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { /* relevant data */ }
}
```

### Error Response
```json
{
  "message": "Error description",
  "errors": [ /* validation errors if any */ ]
}
```

---

## 🔑 Common Status Codes

- `200` - OK (Successful request)
- `201` - Created (Successful creation)
- `400` - Bad Request (Invalid input)
- `401` - Unauthorized (Missing or invalid token)
- `403` - Forbidden (Access denied - insufficient permissions)
- `404` - Not Found (Resource not found)
- `500` - Internal Server Error

---

## 🧪 Example Usage

### Register and Login Flow
```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Response includes token

# 2. Use token for subsequent requests
TOKEN="your_jwt_token_here"

# 3. Get current user
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Shopping Flow
```bash
TOKEN="your_jwt_token_here"

# 1. Get products
curl -X GET "http://localhost:5000/api/products?page=1&limit=12" \
  -H "Authorization: Bearer $TOKEN"

# 2. Get product details
curl -X GET http://localhost:5000/api/products/product_id \
  -H "Authorization: Bearer $TOKEN"

# 3. Add to cart
curl -X POST http://localhost:5000/api/cart/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"product": "product_id", "quantity": 2}'

# 4. Get cart
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer $TOKEN"

# 5. Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"product": "product_id", "quantity": 2}],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postalCode": "10001",
      "country": "USA"
    }
  }'

# 6. Get my orders
curl -X GET http://localhost:5000/api/orders/my-orders \
  -H "Authorization: Bearer $TOKEN"
```

---

## ⚠️ Important Notes

1. **Authentication**: Always include the JWT token in the `Authorization` header
2. **CORS**: Frontend must be on same origin or CORS must be configured
3. **Validation**: All inputs are validated server-side
4. **Pagination**: Maximum limit is 100 items per page
5. **Rate Limiting**: Consider implementing rate limiting for production

---

**For more information, see the README files in backend and frontend directories.**
=======
# API Reference Guide

## Base URL
```
http://localhost:5000/api
```

## Authentication
Include JWT token in header for protected routes:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"  // optional, defaults to "customer"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": { user_object }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { user_object }
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response:
{
  "user": { user_object }
}
```

### Update Profile
```
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  }
}

Response:
{
  "message": "Profile updated successfully",
  "user": { updated_user_object }
}
```

---

## 🛍️ Product Endpoints

### Get All Products
```
GET /products?page=1&limit=12&category=electronics&search=laptop&sort=-createdAt

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 12)
- category: Filter by category
- search: Search term
- sort: Sort field (use - for descending)

Response:
{
  "products": [ product_objects ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 12,
    "pages": 9
  }
}
```

### Get Product by ID
```
GET /products/:id

Response:
{
  "product": { product_object }
}
```

### Get Categories
```
GET /products/categories

Response:
{
  "categories": ["electronics", "clothing", "books"]
}
```

### Create Product (Admin Only)
```
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "category": "electronics",
  "price": 999.99,
  "stock": 50,
  "sku": "LAPTOP-001",
  "image": "image_url",
  "discount": 10
}

Response:
{
  "message": "Product created successfully",
  "product": { product_object }
}
```

### Update Product (Admin Only)
```
PUT /products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Laptop",
  "price": 899.99,
  "stock": 45,
  "discount": 15
}

Response:
{
  "message": "Product updated successfully",
  "product": { updated_product_object }
}
```

### Delete Product (Admin Only)
```
DELETE /products/:id
Authorization: Bearer <token>

Response:
{
  "message": "Product deleted successfully",
  "product": { product_object }
}
```

---

## 🛒 Cart Endpoints

### Get Cart
```
GET /cart
Authorization: Bearer <token>

Response:
{
  "cart": {
    "_id": "cart_id",
    "customer": "user_id",
    "items": [
      {
        "product": { product_object },
        "quantity": 2
      }
    ],
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

### Add to Cart
```
POST /cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "product": "product_id",
  "quantity": 2
}

Response:
{
  "message": "Item added to cart",
  "cart": { cart_object }
}
```

### Update Cart Item
```
PUT /cart/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "product": "product_id",
  "quantity": 5
}

Response:
{
  "message": "Cart item updated",
  "cart": { cart_object }
}
```

### Remove Item from Cart
```
DELETE /cart/:productId
Authorization: Bearer <token>

Response:
{
  "message": "Item removed from cart",
  "cart": { cart_object }
}
```

### Clear Cart
```
DELETE /cart
Authorization: Bearer <token>

Response:
{
  "message": "Cart cleared",
  "cart": { empty_cart_object }
}
```

---

## 📦 Order Endpoints

### Create Order
```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  }
}

Response:
{
  "message": "Order created successfully",
  "order": { order_object }
}
```

### Get My Orders
```
GET /orders/my-orders?page=1&limit=10&status=pending
Authorization: Bearer <token>

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- status: Filter by status (pending, confirmed, shipped, delivered, cancelled, refunded)

Response:
{
  "orders": [ order_objects ],
  "pagination": { pagination_object }
}
```

### Get Order by ID
```
GET /orders/:id
Authorization: Bearer <token>

Response:
{
  "order": { order_object }
}
```

### Cancel Order
```
PUT /orders/:id/cancel
Authorization: Bearer <token>

Response:
{
  "message": "Order cancelled successfully",
  "order": { updated_order_object }
}
```

---

## 👑 Admin Order Endpoints

### Get All Orders
```
GET /orders?page=1&limit=20&status=pending
Authorization: Bearer <admin_token>

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 20)
- status: Filter by status

Response:
{
  "orders": [ order_objects ],
  "pagination": { pagination_object }
}
```

### Update Order Status (Admin Only)
```
PUT /orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "shipped",
  "notes": "Order shipped with FedEx"
}

Status Values:
- pending
- confirmed
- shipped
- delivered
- cancelled
- refunded

Response:
{
  "message": "Order status updated successfully",
  "order": { updated_order_object }
}
```

### Refund Order (Admin Only)
```
PUT /orders/:id/refund
Authorization: Bearer <admin_token>

Response:
{
  "message": "Order refunded successfully",
  "order": { updated_order_object }
}
```

---

## 📊 Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { /* relevant data */ }
}
```

### Error Response
```json
{
  "message": "Error description",
  "errors": [ /* validation errors if any */ ]
}
```

---

## 🔑 Common Status Codes

- `200` - OK (Successful request)
- `201` - Created (Successful creation)
- `400` - Bad Request (Invalid input)
- `401` - Unauthorized (Missing or invalid token)
- `403` - Forbidden (Access denied - insufficient permissions)
- `404` - Not Found (Resource not found)
- `500` - Internal Server Error

---

## 🧪 Example Usage

### Register and Login Flow
```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Response includes token

# 2. Use token for subsequent requests
TOKEN="your_jwt_token_here"

# 3. Get current user
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Shopping Flow
```bash
TOKEN="your_jwt_token_here"

# 1. Get products
curl -X GET "http://localhost:5000/api/products?page=1&limit=12" \
  -H "Authorization: Bearer $TOKEN"

# 2. Get product details
curl -X GET http://localhost:5000/api/products/product_id \
  -H "Authorization: Bearer $TOKEN"

# 3. Add to cart
curl -X POST http://localhost:5000/api/cart/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"product": "product_id", "quantity": 2}'

# 4. Get cart
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer $TOKEN"

# 5. Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"product": "product_id", "quantity": 2}],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postalCode": "10001",
      "country": "USA"
    }
  }'

# 6. Get my orders
curl -X GET http://localhost:5000/api/orders/my-orders \
  -H "Authorization: Bearer $TOKEN"
```

---

## ⚠️ Important Notes

1. **Authentication**: Always include the JWT token in the `Authorization` header
2. **CORS**: Frontend must be on same origin or CORS must be configured
3. **Validation**: All inputs are validated server-side
4. **Pagination**: Maximum limit is 100 items per page
5. **Rate Limiting**: Consider implementing rate limiting for production

---

**For more information, see the README files in backend and frontend directories.**
>>>>>>> 62fd90be2eccb936805075527a7a8436f943ddaf
