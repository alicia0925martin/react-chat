# Real-Time Chat App - Frontend (Client)

# Chat Application Frontend - README

This document outlines the structure, components, and logic of the chat application's frontend.

## 🔁 Basic Project Flow

1.  **Theme Selection Page (Settings.page.jsx):** Allows users to select and preview themes.
2.  **Sidebar Component (Sidebar.jsx):** Displays available users and navigation options.
3.  **Chat Page and Components:**
    *   **ChatContainer.jsx:** Displays message history.
    *   **MessageInput.jsx:** Handles sending messages and files.
    *   **ChatHeader.jsx:** Shows selected user information.

---

## ✅ Theme Selection Page

**File(s):** `src/components/pages/SettingsPage.jsx`, `src/Redux/Reducers/slices/configSlice.jsx`, `src/utils/constants.jsx`

**Purpose:** Allow user to select and preview Daisy UI themes.

**Logic:**

*   Theme selected using a dropdown menu.
*   The selected theme is applied dynamically to the `<html>` element using `document.documentElement.setAttribute('data-theme', theme);`.
*   The selected theme is stored in `localStorage` using `localStorage.setItem('theme', theme)` and in the Redux store (`currentTheme`).

**Detailed Logic & Flow:**

*   Uses the `useDispatch` hook to dispatch the `setTheme` action from `configSlice`.
*   Uses `useEffect` to load the theme from `localStorage` on component mount.

**Redux actions/selectors:**

*   `setTheme` action (updates `currentTheme` in `configSlice`).
*   `useSelector` to access the `currentTheme` from the Redux store.

**UI/UX Elements:**

*   Daisy UI `select` and `option` components for the theme dropdown.

**Constants Used:**

*   `themes` (list of Daisy UI themes) from `src/utils/constants.jsx`.
*   `THEME_KEY` (localStorage key for storing theme) from `src/utils/constants.jsx`.

---

## ✅ Sidebar Component

**File(s):** `src/components/Sidebar.jsx`, `src/Redux/Reducers/slices/chatSlice.jsx`, `src/services/operations.jsx`

**Purpose:** Display user list and allow selecting a chat partner.

**Logic:**

*   Fetches all users from the backend on component mount using the `getAllUsers` operation.
*   `selectedUser` is updated on click and stored in Redux.

**Detailed Logic & Flow:**

*   Uses `useEffect` to fetch users when the component mounts.
*   Uses `useDispatch` to dispatch the `setSelectedUser` action from `chatSlice`.
*   Uses `useSelector` to access the `auth.user` (logged-in user) and `chats.selectedUser` from the Redux store.

**Features:**

*   Highlights the selected user.
*   Includes navigation buttons for settings, logout, etc.

**State Used:**

*   `auth.user` (from `authSlice` - logged-in user)
*   `chats.selectedUser` (from `chatSlice` - currently selected chat partner)

**UI/UX Elements:**

*   Daisy UI `list` and `list-item` components for the user list.
*   Navigation icons.

---

## ✅ ChatContainer (Messages Page)

**File(s):** `src/components/ChatContainer.jsx`, `src/services/operations.jsx`, `src/components/skeletons/MessageSkeleton.jsx`

**Purpose:** Display messages between the logged-in user and the selected user.

**Logic:**

*   Fetches messages using `getMessages()` from `operations.jsx`.
*   Preserves scroll position unless at the bottom of the chat.
*   Auto-scrolls only on sending a new message or if the user is near the bottom.

**Detailed Logic & Flow:**

*   Uses `useEffect` to fetch messages when the `selectedUser` changes.
*   Uses `useRef` to manage the scroll position.
*   Scroll preservation is implemented by storing the scroll position before updating messages and restoring it after the update.

**Features:**

*   Displays text, images, and other files with type detection.
*   Renders timestamps using a formatted time (see `formatMessageTime` in `src/utils/constants.jsx`).
*   Displays message skeletons while loading.

**UI/UX Elements:**

*   Messages are displayed in a chat bubble style.
*   Uses `MessageSkeleton` for loading state.

---

## ✅ MessageInput

**File(s):** `src/components/MessageInput.jsx`

**Purpose:** Handle sending messages and files.

**Logic:**

*   Uses `useState` for managing text input and selected file.
*   Sends message via `sendMessage(dispatch, ...)`.
*   Handles file preview and upload validations.

**Detailed Logic & Flow:**

*   Uses `useState` to manage the text input (`message`) and the selected file (`file`).
*   The `sendMessage` function (likely defined in `operations.js` or a similar file) is used to send the message to the backend.
*   File validation checks the file type against allowed types.

**Events:**

*   The Enter key and send button both trigger sending the message.

**UX Features:**

*   The input is disabled when a file is uploading.
*   Displays a toast error if the file type is unsupported.

**UI/UX Elements:**

*   Daisy UI `input` and `button` components.
*   File preview component.

---

## 📘 Add-on Sections

### Constants Used:

*   **Themes:** Defined in `src/utils/constants.jsx`.
*   **Route names:** Defined in `src/utils/constants.jsx` (e.g., `/login`, `/home`, `/settings`).
*   **API URLs:** Defined in `src/services/apiConnector.jsx`.
*   **localStorage keys:** Defined in `src/utils/constants.jsx` (e.g., `THEME_KEY`, `AUTH_TOKEN`).

### Redux Slices Overview:

*   **`configSlice`:** Handles the selected theme (`currentTheme`).
*   **`chatSlice`:** Handles the selected user (`selectedUser`) and messages.
*   **`authSlice`:** Stores the logged-in user (`auth.user`).

### Utility Files:

*   **`src/utils/constants.jsx`:** Contains constants like themes, route names, API URLs, and localStorage keys.
*   **`src/services/apiConnector.jsx`:** Handles API requests and responses.
*   **`src/services/operations.jsx`:** Contains asynchronous functions for interacting with the backend API (e.g., `getMessages`, `sendMessage`, `getAllUsers`).

### Folder Structure:

- **React 19** – Frontend UI library
- **Vite** – Lightning-fast frontend build tool
- **Tailwind CSS** – Utility-first CSS framework
- **DaisyUI** – Tailwind-based component library
- **React Router DOM** – Routing support for React SPA
- **React Hot Toast** – Lightweight toast notifications
- **Lucide React** - For React Icons

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
    - **useCheckAuth** (makes the checkAuth api call to check if user is authentication or not)
    - if present **updates the auth store** with user
    - navigates to login page

- Protected Routes (based on checkAuth)
    - **<Route element={user? <HomePage/> : <Navigate to="/login"/>}>**


# Phase 3: Login and Signup Pages (Logic and Features): 
- # Sign Up Page (Logic and features): 
    - Created the sign up form using daisy ui: 
    - State management using formData
    - Created Operations.jsx (for central logic for login and signup operations)
    - Created **useCheckUsername custom hook** to check if the username is valid or not: 
        - Used **debouncing** and **real time api calls** for username
    - Validating form data and returning toast.error for invalid cases
    - Making the api call for signup and updating the user in redux store: 
    - signing in user: 

- # Login Page (Logic and features): 
    - Created the UI using Daisy Ui: 
    - state management using form data
    - moved the logic to operations.jsx for login
    - validating form data and generating toast for invalid cases 
    - Allowing user to **login either with email or username** validation:
    - making the api call to login operation
    - updating the user to redux store

- # Navbar with Logout Feature: 
    - Created the Ui using daisy Ui: 
    - showing the logout button if user is present (subscribing to the store)
    - Logout api call to backend
    - toasts for success and error

- # Profile Page: 
    - Created the profile page ui
    - allowing the profile pic by uploading file 
    - making an api call to backend to update the profile 
    - updating other detais like (displayName , contactNumber)
    - by making the api call to backend

- # Settings Page: (Themes Selection and preview):

    


## 📂 Folder Structure (Auth-related)

src/
│
├── components/
│ └── AuthImagePattern.jsx # Right-side image + message
│
├── hooks/
│ └── useCheckUserName.js # (optional custom hook for signup)
│
├── pages/
│ └── LoginPage.jsx # Login UI and form logic
│
├── services/
│ ├── apiConnector.js # Axios instance config
│ └── operations.js # login, signup functions
│
├── Redux/
│ └── Reducers/
│ └── slices/
│ └── authSlice.js # loading and user state