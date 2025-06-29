# Real-Time Chat App - Frontend (Client)

This is the frontend for the **Real-Time Chat Application**, built with **React 19**, **Vite**, **Tailwind CSS**, and other modern tools for speed and scalability.

---

## 🛠️ Tech Stack

- **React 19** – Frontend UI library
- **Vite** – Lightning-fast frontend build tool
- **Tailwind CSS** – Utility-first CSS framework
- **DaisyUI** – Tailwind-based component library
- **React Router DOM** – Routing support for React SPA
- **React Hot Toast** – Lightweight toast notifications

---

## ✅ Setup Progress So Far

### 📦 Initialization
- Initialized the React app using **Vite**:  
  ```bash
  npm create vite@latest client -- --template react



# Phase 1 : Initialization: 
- Created the react app using vite 
- Installed tailwind css 
- Installed daisy ui
- Installed required dependencies 
    - react-router
    - react-redux 
    - react-hot-toast
- Created Pages and components: 
    - Pages(dummy)
        - Signup
        - Login
        - HomePage
        - Profile 
        - Settings
- Setting up Routing for each Each Page in (app.jsx)


# Phase 2 : Authentication (Checking User is logged in or not): 
- Setting up Redux store to store auth data: 
    - Created redux store
    - Created auth slice (reducer)
        - created setUser , removeUser , setLoading actions
    
- Created custom hook
    - useCheckAuth (makes the checkAuth api call to check if user is authentication or not)
    - navigates to login page

- Protected Routes (based on checkAuth)
    - **<Route element={user? <HomePage/> : <Navigate to="/login"/>}>**