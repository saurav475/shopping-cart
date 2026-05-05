# Shopping Cart Frontend

React-based frontend for the Shopping Cart application.

## Features

- Responsive design (mobile, tablet, desktop)
- Product browsing with search and filtering
- Shopping cart management
- Secure checkout process
- Order tracking
- User profile management
- Admin dashboard for product and order management
- Real-time cart updates
- JWT authentication

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React 18+

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with backend API URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Development
```bash
npm start
```

The application will run on `http://localhost:3000`

### Production Build
```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── context/         # React context (Auth, Cart)
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Helper functions
│   │   ├── api.js       # Axios instance
│   │   ├── apiService.js # API calls
│   │   └── helpers.js   # Utility functions
│   ├── styles/          # CSS files
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── public/
│   └── index.html       # HTML template
├── package.json
└── .env.example
```

## Components

### Core Components
- `Header` - Navigation header
- `Footer` - Footer section
- `ProductCard` - Product display card
- `Loading` - Loading spinner
- `Alert` - Notification alerts

### Pages
- `HomePage` - Product listing
- `ProductDetailPage` - Product details
- `CartPage` - Shopping cart
- `CheckoutPage` - Order checkout
- `OrdersPage` - User orders
- `LoginPage` - User login
- `RegisterPage` - User registration
- `ProfilePage` - User profile
- `AdminProductsPage` - Admin product management
- `AdminOrdersPage` - Admin order management

## Context & State Management

### AuthContext
- User authentication
- Login/Register
- Profile updates
- Role-based access

### CartContext
- Cart management
- Add/remove items
- Cart total calculation

## Custom Hooks

- `useFetch` - Fetch data with loading state
- `usePagination` - Pagination logic
- `useForm` - Form state management

## Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 768px, 1200px
- Flexible grid layouts
- Touch-friendly buttons

## API Integration

All API calls go through `apiService.js`:
- Authentication
- Products (list, detail, create, update, delete)
- Cart (get, add, update, remove, clear)
- Orders (create, list, view, cancel, refund)

## Best Practices Implemented

✅ **Performance**
- Code splitting with React Router
- Lazy loading for images
- Efficient re-renders
- Memoization where needed

✅ **User Experience**
- Responsive design
- Loading states
- Error handling
- Form validation
- Success notifications

✅ **Code Quality**
- Component composition
- Custom hooks for logic reuse
- Context for global state
- Clean code structure
- Consistent naming

✅ **Security**
- JWT token storage
- Protected routes
- Role-based access control
- Input sanitization

## Styling

- Global CSS for common styles
- Component-specific CSS modules
- CSS variables for theming
- Flexbox and Grid layouts
- Responsive utilities

## Features Breakdown

### Customer Features
1. **Browse Products**
   - Search functionality
   - Filter by category
   - Pagination
   - Product details

2. **Shopping Cart**
   - Add/remove items
   - Update quantities
   - View cart total
   - Proceed to checkout

3. **Checkout**
   - Enter shipping address
   - Review order
   - Place order
   - Order confirmation

4. **Orders**
   - View order history
   - Track order status
   - Cancel pending orders
   - View order details

5. **User Profile**
   - Update personal info
   - Manage address
   - View account details

### Admin Features
1. **Product Management**
   - List all products
   - Create new products
   - Edit products
   - Delete products
   - Manage stock

2. **Order Management**
   - View all orders
   - Update order status
   - Refund orders
   - Filter by status

## Environment Variables

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
