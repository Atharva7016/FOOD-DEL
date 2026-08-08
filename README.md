# 🍅 Tomato — Food Delivery App

A full-stack food delivery web application with a customer storefront, admin panel, and REST API. Users can browse food, search dishes, manage cart, place Stripe payments, and track orders. Admins can manage menu items and order status.

## ✨ Features

### Customer App
- Browse food by category
- Search dishes by name/description
- Add to cart / update quantity
- User register & login (with 10-digit phone on signup)
- Checkout with delivery details
- Stripe payment integration
- Active orders + Past (delivered) orders

### Admin Panel
- Secure admin login (separate admin app)
- Add / list / remove food items (JPG/JPEG only)
- Manage active orders & past orders
- Update order status (Processing → Out for delivery → Delivered)
- Delete orders

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, React Router, Axios |
| Admin | React, Vite, React Router, React Toastify |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcrypt |
| Payments | Stripe |
| Hosting | Render |

## 📁 Project Structure

```
FOOD-DEL/
├── frontend/     # Customer website
├── admin/        # Admin dashboard
└── backend/      # API server
```

## 🌐 Live Demo

| App | URL |
|-----|-----|
| Customer | [food-del-frontend-tdik.onrender.com](https://food-del-frontend-tdik.onrender.com) |
| Backend API | [food-del-backendd-sw5b.onrender.com](https://food-del-backendd-sw5b.onrender.com) |

> Admin panel is private (not linked publicly). Use the separate admin deploy URL and credentials from your local `.env`.

## 🚀 Getting Started (Local)

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas connection (or local MongoDB)
- Stripe secret key (for payments)

### 1. Backend
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (this file is gitignored):
```env
PORT=4000
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
FRONTEND_URL=http://localhost:5173
```

Update MongoDB URI in `backend/config/db.js` if needed.

```bash
npm run dev
```
API runs at `http://localhost:4000`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Create `frontend/.env` (optional for local API):
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_ADMIN_URL=http://localhost:5174
```

### 3. Admin
```bash
cd admin
npm install
npm run dev
```
Create `admin/.env` (optional):
```env
VITE_BACKEND_URL=http://localhost:4000
```

## 📡 Main API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register customer |
| POST | `/api/user/login` | Customer login |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/food/list` | List food items |
| POST | `/api/food/add` | Add food (admin) |
| POST | `/api/food/remove` | Remove food (admin) |
| POST | `/api/cart/add` | Add to cart |
| POST | `/api/order/place` | Place order |
| POST | `/api/order/userorders` | User orders |
| GET | `/api/order/list` | All orders (admin) |
| POST | `/api/order/status` | Update status (admin) |
| POST | `/api/order/delete` | Delete order (admin) |

## 📸 Screenshots

> Add screenshots of Home, Cart, My Orders, and Admin panel here after capturing them.

## 👤 Author

**Atharva**  
GitHub: [Atharva7016](https://github.com/Atharva7016)

## 📄 License

This project is for educational / portfolio purposes.
