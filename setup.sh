#!/bin/bash

# Shopping Cart Setup Script

echo "🛍️ Shopping Cart Setup"
echo "====================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ NPM version: $(npm -v)"

# Check if MongoDB is running
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB might not be installed. Please ensure MongoDB is running."
    echo "   Download from: https://www.mongodb.com/try/download/community"
fi

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ Backend dependencies installed"
else
    echo "✅ Backend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Backend .env file created"
fi

cd ..

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "✅ Frontend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Frontend .env file created"
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Ensure MongoDB is running on localhost:27017"
echo "  2. Run 'npm run dev' in the backend directory"
echo "  3. Run 'npm start' in the frontend directory"
echo ""
echo "🌐 Access the application at: http://localhost:3000"
echo "📊 API runs at: http://localhost:5000"
