# Lost & Found Web Application

A full-stack Lost & Found application built to help users report lost items, post found items, and get notified when a potential match occurs.

This project is being actively refactored and improved to follow clean architecture, proper authentication, and deployment-ready practices.

---

## 🚀 Features

* User authentication (Signup & Login)
* Create, read, update, and delete lost/found items
* User-specific dashboards
* Protected routes
* Notification system (planned)
* Clean REST API architecture

---

## 🛠 Tech Stack

### Frontend

* React
* JavaScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📁 Project Structure

```
root/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Start the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Authentication Flow (Overview)

1. User signs up with email and password
2. Password is hashed and stored securely
3. User logs in and receives a JWT token
4. Token is stored on the client
5. Protected routes verify the token via middleware

---

## 🔔 Notification System (Planned)

* In-app notifications when a found item matches a lost item
* Notifications stored in database
* Displayed on user dashboard

---

## 🧠 Learning Goals

* Understand full-stack authentication flow
* Write clean, modular backend code
* Refactor and understand existing codebase
* Gain confidence in deploying real-world applications

---

## 📌 Notes

* `node_modules` are intentionally ignored via `.gitignore`
* This project was initially developed as a collaborative college project and is being refactored for individual understanding and production readiness

---

## 📜 License

This project is for educational purposes.
