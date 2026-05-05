# Shopping Cart - Setup & Installation Guide

## 🚀 Quick Start Guide

This guide will help you set up and run the Shopping Cart application on your local machine.

## Prerequisites

Before you begin, ensure you have installed:

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify: `node -v` and `npm -v` in terminal

2. **MongoDB** (local or Atlas)
   - Local: https://www.mongodb.com/try/download/community
   - Atlas Cloud: https://www.mongodb.com/cloud/atlas
   - Verify: MongoDB should be running on port 27017

3. **Git** (optional)
   - Download: https://git-scm.com/

## 🔧 Automated Setup

### On Windows:
```bash
setup.bat
```

### On macOS/Linux:
```bash
chmod +x setup.sh
./setup.sh
```

This script will:
1. Verify Node.js installation
2. Install backend dependencies
3. Install frontend dependencies
4. Create .env files

## 📋 Manual Setup

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Verify .env file
# If .env doesn't exist, create it from .env.example
cp .env.example .env

# Edit .env with your settings
# - Update MongoDB connection string if needed
# - Change JWT_SECRET to a secure value
```

### Step 2: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Verify .env file
cp .env.example .env

# Ensure REACT_APP_API_URL matches your backend
# Default: http://localhost:5000/api
```

### Step 3: MongoDB Setup

#### Option A: Local MongoDB

```bash
# Start MongoDB (if not already running)
mongod
```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in backend/.env

## ▶️ Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

Expected output:
```
Server is running on port 5000
MongoDB connected successfully
```

### Start Frontend (in new terminal)

```bash
cd frontend
npm start
```

The application will automatically open at `http://localhost:3000`

## 🌐 Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🧪 Test Accounts

### Admin Account
```
Email: admin@test.com
Password: admin123
```

### Customer Account
```
Email: customer@test.com
Password: customer123
```

## 📁 Project Structure

```
shopping-cart/
├── backend/              # Express API server
│   ├── src/
│   ├── package.json
│   └── .env
├── frontend/             # React application
│   ├── src/
│   ├── package.json
│   └── .env
└── README.md
```

## 🐳 Docker Setup (Optional)

If you prefer to run with Docker:

```bash
# Start all services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution: Ensure MongoDB is running
- Local: mongod command
- Atlas: Check connection string in .env
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000

Solution: Change PORT in .env or kill process using the port
- Linux/Mac: lsof -i :5000 | kill -9 <PID>
- Windows: netstat -ano | findstr :5000 | taskkill /PID <PID> /F
```

### Dependencies Installation Error
```
Solution: Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
```
Solution: Ensure backend is running and REACT_APP_API_URL is correct
- Backend should run on http://localhost:5000
- Frontend should point to http://localhost:5000/api
```

## 📦 Build for Production

### Backend
```bash
cd backend
npm start  # Production mode
```

### Frontend
```bash
cd frontend
npm run build
npm install -g serve
serve -s build
```

## 🔐 Security Checklist

Before deploying:

- [ ] Change JWT_SECRET in backend .env
- [ ] Update MONGODB_URI for production
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Add environment variables to deployment platform
- [ ] Review and update API endpoints
- [ ] Test all authentication flows

## 📚 Additional Resources

- [Node.js Guide](https://nodejs.org/en/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Authentication](https://jwt.io/introduction)

## 🤝 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review console logs for error messages
3. Verify all prerequisites are installed
4. Check .env files for correct configuration
5. Ensure all services (MongoDB, Backend, Frontend) are running

## 📝 Next Steps

After setup:

1. **Explore the Application**
   - Browse products as a customer
   - Add items to cart
   - Create an order

2. **Admin Features**
   - Login with admin account
   - Add/edit products
   - Manage orders

3. **Customize**
   - Update product data
   - Modify styling
   - Add new features

Happy coding! 🚀
