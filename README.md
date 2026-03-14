
# 💬 Chatty – Real-Time Chat Application

**Live Link**: [https://chatty-frontend-7pr0.onrender.com](https://chatty-frontend-7pr0.onrender.com)

## 🧠 Overview

**Chatty** is a full-stack real-time chat application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **Socket.IO** for real-time communication. It supports user authentication, profile management, real-time messaging with file/image support, email OTP verification, and more.

It is a fully functional modern chat platform designed for fast, responsive, and secure messaging between users.

## 🚀 Features

### 🔐 Authentication & Authorization
- Signup with email + password
- Login via username or email
- Secure password hashing
- Persistent login with cookies
- Logout functionality
- OTP email verification during signup

### 👤  User Profile
- View and edit profile
- Upload profile picture
- Update contact number and display name
- File uploads handled via Cloudinary

### 💬 Real-Time Chat
- 1-on-1 messaging with Socket.IO
- Real-time message delivery without refresh
- Online users indicator
- Send text messages or attach images/files
- File preview before sending
- Auto-scroll to the latest message

### ⚙️ Settings
- Change profile picture and contact info
- View list of active users
- Logout from settings

### 📦 File Upload Support
- Image/file support with type previews
- Files stored securely in Cloudinary

### 🌐 Deployment
- **Frontend** hosted on Render (Static Site)
- **Backend + WebSocket Server** hosted on Render (Web Service)

## 🛠️ Tech Stack

| Layer       | Technology                        |
|-------------|------------------------------------|
| Frontend    | React.js + Tailwind CSS            |
| State Mgmt  | Redux Toolkit                      |
| Backend     | Node.js + Express.js               |
| DB          | MongoDB Atlas                      |
| Real-Time   | Socket.IO                          |
| Auth        | JWT + HTTP-only Cookies            |
| File Upload | Cloudinary                         |
| Email       | Nodemailer (Gmail SMTP)            |
| Hosting     | Render (Frontend + Backend)        |

## 🔗 Live Links

- 🌐 **Frontend**: [https://chatty-app-by-aryan.onrender.com](https://chatty-app-by-aryan.onrender.com)
- 🛠️ **Backend API Base URL**: `https://chatty-backend-24kt.onrender.com/api/v1`
- 🔌 **WebSocket Endpoint**: `https://chatty-backend-24kt.onrender.com`

## 📁 Folder Structure (Frontend)

```
src/
├── components/
│   ├── pages/               # Home, Login, Signup, Settings, etc.
│   ├── MessageInput.jsx
│   ├── ChatContainer.jsx
│   └── ChatHeader.jsx
├── services/
│   ├── operations.js        # All API + Socket logic
├── Redux/
│   ├── slices/
├── utils/
│   └── constants.js
├── App.jsx
└── index.jsx
```

## ⚙️ Environment Variables (Backend)

```
PORT=3000
MONGODB_URL=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>

CLOUDINARY_URL=cloudinary://<cloudinary-api-key>
CLOUDINARY_FOLDER=ChattyProfilePics
CLOUDINARY_CHAT_FOLDER=ChattyMessageFiles

MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_app_password
CLIENT_URL=https://chatty-app-by-aryan.onrender.com
```

## 🧪 How to Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## 📧 Contact

If you have any questions or suggestions, feel free to reach out at:

- 📬 **Email**: aaryangupta636@gmail.com

