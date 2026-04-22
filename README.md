# 🚀 TradeNova – Paper Trading Platform

🔗 **Live App:** https://tradenova-rho.vercel.app  

TradeNova is a full-stack paper trading platform that allows users to simulate stock trading with virtual money. It provides a realistic trading experience with user-specific portfolios, live price simulation, and a modern responsive UI.

---
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Status](https://img.shields.io/badge/Status-Live-success)

## 📌 Features

### 🔐 Authentication
- User signup & login with JWT
- Secure user-specific data handling

### 💰 Virtual Portfolio System
- Every new user gets **₹1,00,000 virtual balance**
- Balance updates in real-time on buy/sell
- Each user has a **separate portfolio**

### 📈 Trading System
- Buy & Sell stocks with validation
- Weighted average price calculation
- Holdings update dynamically
- Orders stored per user

### 📊 Live Price Simulation
- Built using **random walk algorithm**
- Prices update every 2 seconds
- Real-time P&L and portfolio updates
- Visual indicators:
  - ▲ Green for profit
  - ▼ Red for loss

### 📱 Responsive UI/UX
- Fully responsive (Mobile + Desktop)
- Modern dashboard design
- Clean and intuitive UI

### 👤 User Avatar
- Dynamic avatar using user initials  
- Example: Harish Prajapat → HP

---

## 🛠 Tech Stack

**Frontend**
- React.js
- CSS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB

**Deployment**
- Vercel (Frontend)
- Render (Backend)

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/tradenova.git
cd tradenova
```
### 2. Setup Backend
```bash
cd backend
npm install
```
Create a .env file inside the backend folder and add:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3002
```
Run backend:
```bash
npm start
```
### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
```
### 🌐 Deployment
 Frontend deployed on Vercel
 Backend deployed on Render
---
### 🧠 Key Highlights
- Built a realistic trading experience without paid APIs
- Implemented live stock price simulation
- Designed user-specific portfolio system
- Focused on UI/UX and real-world functionality
---
### 📸 Screenshots
<img width="1914" height="967" alt="Screenshot 2026-04-22 115709" src="https://github.com/user-attachments/assets/10739a7c-45da-44ba-a3cc-d2ecc9bb9b85" />
---
<img width="1918" height="970" alt="image" src="https://github.com/user-attachments/assets/5a131ffb-2667-4b93-8036-336ad5dce9df" />




---
### 📈 Future Improvements
- Real stock market API integration
- Watchlist customization
- Advanced charts
- Notifications & alerts
---
### 📬 Contact
- LinkedIn: www.linkedin.com/in/harish-prajapat
---
### ⭐ Support

If you like this project, give it a ⭐ on GitHub!
