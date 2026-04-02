# 📊 Finance Dashboard App

A modern and responsive **Finance Dashboard** built to track income, expenses, and financial insights. This project demonstrates strong frontend skills including state management, data visualization, and role-based UI behavior.

---

## 🚀 Features

### 📌 Dashboard Overview
- Summary cards:
  - 💰 Total Balance  
  - 📈 Total Income  
  - 📉 Total Expenses  
- Time-based visualization:
  - Balance trend over time  
- Categorical visualization:
  - Spending breakdown by category  

---

### 💳 Transactions Section
- Displays a list of transactions with:
  - Date  
  - Amount  
  - Category  
  - Type (Income / Expense)  

- Functionalities:
  - 🔍 Search transactions  
  - 🎯 Filter by type/category  
  - ↕️ Sort transactions  

---

### 👤 Role-Based UI (Frontend Simulation)
- **Viewer**
  - Can only view data  
- **Admin**
  - Can add/edit transactions  

- Role switching:
  - Toggle role using dropdown for demo  

---

### 📊 Insights Section
- Automatically generated insights:
  - 📌 Highest spending category  
  - 📅 Monthly comparison  
  - 📉 Key financial observations  

---

### ⚙️ State Management
Handles:
- Transactions data  
- Filters & search  
- Selected user role
- Context API

---

### 🎨 UI & UX
- Clean and modern design  
- Fully responsive (mobile + desktop)  
- Handles edge cases:
  - Empty state  
  - No transactions  
  - No results after filtering  

---

## 🧠 Approach

### 🏗️ Architecture
- Component-based design  
- Clear separation of concerns:
  - UI components  
  - State logic  
  - Utility functions  

### 📊 Data Handling
- Centralized state for transactions  
- Derived values like balance and insights computed dynamically  

### 📈 Visualization
- Time-based charts for trends  
- Category-based charts for spending distribution  

### 🔐 Role Simulation
- Role stored in state  
- Conditional rendering used for access control  

---

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Styling:** Tailwind CSS  
- **Charts:** Recharts / Chart.js  

---

## ⚡ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard
