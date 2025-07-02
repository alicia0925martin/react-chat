
## Frontend Documentation

### 🔍 Overview:

-   **Purpose:** The chat application's frontend provides the user interface for real-time chat, user authentication, profile management, and theme selection.
-   **Features:**
    -   Real-time chat between users
    -   User authentication (login, signup, logout, Aadhaar + OTP)
    -   Profile management (update profile picture, display name, contact number)
    -   Theme selection and persistence
    -   Settings page
-   **User Interaction Flow:**
    1.  Landing Page/Login: User lands on the login/signup page.
    2.  Authentication: User authenticates via email/password or Aadhaar + OTP.
    3.  Home Page: Upon successful login, the user is redirected to the Home page, which displays the list of users and the chat interface.
    4.  Chat Interaction: User selects a user from the list to start a chat.
    5.  Profile/Settings: User can navigate to their profile or settings page.
-   **State Management:** Redux Toolkit is used for global state management.  `useState` is likely used for component-level state.

### 📁 Folder Structure:

```
client/
├── .gitignore
├── eslint.config.js
├── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── public/
│   └── vite.svg
├── README.md
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── AuthImagePatter.jsx
│   │   ├── ChatContainer.jsx
│   │   ├── ChatHeader.jsx
│   │   ├── MessageInput.jsx
│   │   ├── Navbar.jsx
│   │   ├── NoChatSelected.jsx
│   │   ├── OTPInput.jsx
│   │   ├── OtpModal.jsx
│   │   ├── OtpPage.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── Sidebar.jsx
│   │   └── skeletons/
│   │       ├── MessageSkeleton.jsx
│   │       └── SidebarSkeleton.jsx
│   ├── hooks/
│   │   ├── useAuth.jsx
│   │   └── useCheckUserName.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── Redux/
│   │   ├── Reducers/
│   │   │   ├── index.jsx
│   │   │   └── slices/
│   │   │       ├── authSlice.jsx
│   │   │   ├── chatSlice.jsx
│   │   │   └── configSlice.jsx
│   │   └── store/
│   │       └── store.jsx
│   ├── services/
│   │   ├── apiConnector.jsx
│   │   └── operations.jsx
│   └── utils/
│       └── constants.jsx
├── vite.config.js
```

-   `.gitignore`: Specifies intentionally untracked files that Git should ignore.
-   `eslint.config.js`: Configuration file for ESLint, a JavaScript linting tool.
-   `index.html`: The main HTML file that serves as the entry point for the React application.
-   `node_modules/`: Contains the installed Node.js packages.
-   `package-lock.json`: Records the exact versions of the dependencies used in the project.
-   `package.json`: Contains metadata about the project, including dependencies and scripts.
-   `public/`: Contains static assets like images and fonts.
    -   `vite.svg`: Vite's logo.
-   `README.md`: Provides an overview of the project and instructions for running it.
-   `src/`: Contains the main source code for the React application.
    -   `App.css`: Global styles for the application.
    -   `App.jsx`: The main application component that renders the routes.
    -   `assets/`: Contains static assets.
        -   `react.svg`: React logo.
    -   `components/`: Contains reusable React components.
        -   `AuthImagePatter.jsx`: Displays a right-side image with a message on authentication pages.
        -   `ChatContainer.jsx`: Displays the message history.
        -   `ChatHeader.jsx`: Displays information about the selected chat partner.
        -   `MessageInput.jsx`: Handles sending messages and files.
        -   `Navbar.jsx`: Provides navigation and logout functionality.
        -   `NoChatSelected.jsx`: Displays a message when no chat partner is selected.
        -   `OTPInput.jsx`: Handles OTP input for authentication.
        -   `OtpModal.jsx`: Displays a modal for OTP input and verification.
        -   `OtpPage.jsx`: Displays the OTP input page for authentication.
        -   `pages/`: Contains React components for different pages.
            -   `HomePage.jsx`: The main chat page.
            -   `LoginPage.jsx`: User login page.
            -   `ProfilePage.jsx`: User profile page.
            -   `SettingsPage.jsx`: Application settings page.
            -   `SignupPage.jsx`: User signup page.
        -   `Sidebar.jsx`: Displays the list of users and navigation options.
        -   `skeletons/`: Contains loading skeletons.
            -   `MessageSkeleton.jsx`: Loading skeleton for messages.
            -   `SidebarSkeleton.jsx`: Loading skeleton for the sidebar.
    -   `hooks/`: Contains custom React hooks.
        -   `useAuth.jsx`: Custom hook for authentication logic.
        -   `useCheckUserName.jsx`: Custom hook to check if the username is available.
    -   `index.css`: Global styles for the application.
    -   `main.jsx`: The entry point for the React application.
    -   `Redux/`: Contains Redux-related files.
        -   `Reducers/`: Contains Redux reducers.
            -   `index.jsx`: Root reducer.
            -   `slices/`: Contains Redux slices.
                -   `authSlice.jsx`: Redux slice for authentication state.
                -   `chatSlice.jsx`: Redux slice for chat state.
                -   `configSlice.jsx`: Redux slice for configuration state.
        -   `store/`: Contains the Redux store.
            -   `store.jsx`: Redux store configuration.
    -   `services/`: Contains services for making API calls.
        -   `apiConnector.jsx`: Handles API requests using Axios.
        -   `operations.jsx`: Contains asynchronous functions for interacting with the backend API.
    -   `utils/`: Contains utility functions and constants.
        -   `constants.jsx`: Contains constants like themes, route names, API URLs, and localStorage keys.
-   `vite.config.js`: Configuration file for Vite.

### 📄 Page-by-Page Breakdown:

#### - LoginPage.jsx:

-   **Core Logic:** Handles user login with email/username and password.
    // Uses `useState` to manage form data.
    // Calls the login API endpoint using `operations.jsx`.
    // Updates the Redux store with user data upon successful login.
-   **useEffect:** None.
-   **Event Handlers:**
    -   `handleSubmit`: Handles the form submission event.
        // Validates the form data.
        // Makes an API call to the login endpoint.
        // Updates the Redux store and navigates to the home page upon successful login.
-   **API Calls:** Calls the login API endpoint defined in `operations.jsx`.
-   **UI Behavior:**
    -   Displays error messages using `react-hot-toast`.
    -   Navigates to the home page upon successful login.
-   **User Input Handling:**
    -   Handles user input for email/username and password.
    -   Validates the input and displays error messages if necessary.

#### - SignupPage.jsx:

-   **Core Logic:** Handles user signup.
    // Uses `useState` to manage form data.
    // Calls the signup API endpoint using `operations.jsx`.
    // Updates the Redux store with user data upon successful signup.
    // Uses `useCheckUsername` hook to check username availability.
-   **useEffect:** None.
-   **Event Handlers:**
    -   `handleSubmit`: Handles the form submission event.
        // Validates the form data.
        // Makes an API call to the signup endpoint.
        // Updates the Redux store and navigates to the home page upon successful signup.
-   **API Calls:** Calls the signup API endpoint defined in `operations.jsx`.
-   **UI Behavior:**
    -   Displays error messages using `react-hot-toast`.
    -   Navigates to the home page upon successful signup.
-   **User Input Handling:**
    // Handles user input for username, email, password, etc.
    // Validates the input and displays error messages if necessary.
    // Uses debouncing and real-time API calls for username validation with `useCheckUsername` hook.

#### - HomePage.jsx:

-   **Core Logic:** Renders the main chat interface.
    // Renders the `Sidebar` and `ChatContainer` components.
-   **useEffect:** None.
-   **Event Handlers:** None.
-   **API Calls:** None.
-   **UI Behavior:** Displays the chat interface.
-   **User Input Handling:** None.

#### - ProfilePage.jsx:

-   **Core Logic:** Allows users to update their profile information.
    // Uses `useState` to manage form data.
    // Calls the update profile API endpoint using `operations.jsx`.
-   **useEffect:** None.
-   **Event Handlers:**
    -   `handleSubmit`: Handles the form submission event.
        // Validates the form data.
        // Makes an API call to the update profile endpoint.
        // Updates the Redux store with the updated user data.
    -   Handles profile picture uploads.
-   **API Calls:** Calls the update profile API endpoint defined in `operations.jsx`.
-   **UI Behavior:**
    // Displays error messages using `react-hot-toast`.
    // Updates the profile information on the page upon successful update.
-   **User Input Handling:**
    // Handles user input for display name, contact number, and profile picture.
    // Validates the input and displays error messages if necessary.

#### - SettingsPage.jsx:

-   **Core Logic:** Allows users to select a theme.
    // Uses `useDispatch` and `useSelector` hooks from Redux.
    // Updates the theme in the Redux store and localStorage.
-   **useEffect:**
    // Loads the theme from localStorage on component mount.
-   **Event Handlers:**
    -   Handles theme selection.
-   **API Calls:** None.
-   **UI Behavior:** Updates the theme dynamically.
-   **User Input Handling:** Handles user selection of a theme.

#### - OTPInput.jsx, OtpModal.jsx, OtpPage.jsx:

-   **Core Logic:** Handles OTP input and verification for authentication.
    // Uses `useState` to manage OTP input.
    // Calls the OTP verification API endpoint using `operations.jsx`.
-   **useEffect:** None.
-   **Event Handlers:**
    -   Handles OTP submission.
-   **API Calls:** Calls the OTP verification API endpoint.
-   **UI Behavior:** Displays a modal or page for OTP input.
    // Provides user feedback on successful/failed verification (likely toasts).
-   **User Input Handling:** Handles OTP input and validation.

### 🎨 UI Details:

-   **Styling:** Tailwind CSS is used for styling. DaisyUI is used for pre-built components.
-   **Design Patterns:**
    -   Conditional rendering is used extensively to display different content based on the application state (e.g., user authentication status, selected chat partner).
    -   Responsiveness is likely implemented using Tailwind CSS's responsive utilities.

### 🔌 External Libraries:

-   `@reduxjs/toolkit`: Used for creating and configuring the Redux store and slices.
    // Provides `configureStore`, `createSlice`, and other utilities for Redux.
-   `axios`: Used for making HTTP requests to the backend API.
    // Handles API requests and responses.
-   `lucide-react`: Used for icons.
-   `react`: The core React library.
-   `react-dom`: Used for rendering React components in the browser.
-   `react-hot-toast`: Used for displaying toast notifications.
    // Provides a simple way to display success and error messages to the user.
-   `react-redux`: Used for connecting React components to the Redux store.
    // Allows components to access and update the Redux state.
-   `react-router-dom`: Used for routing in the React application.
    // Provides components like `BrowserRouter`, `Route`, and `Link` for navigation.
-   `tailwindcss`: Used for styling the application.
-   `vite`: Used as the build tool.
-   `daisyui`: Component library based on Tailwind CSS

### 🔄 App Flow:

1.  **App Launch:** The application starts at `main.jsx`, which renders the `App.jsx` component.
2.  **Routing:** `App.jsx` defines the routes for the application using `react-router-dom`.
3.  **Authentication Check:** The `useAuth` hook is used to check if the user is authenticated.
    // If the user is not authenticated, they are redirected to the login page.
    // If the user is authenticated, their user data is loaded into the Redux store.
4.  **Login/Signup:** The user logs in or signs up using the `LoginPage.jsx` or `SignupPage.jsx` components.
    // The login and signup logic is handled in `operations.jsx`.
    // Upon successful login/signup, the user data is stored in the Redux store, and the user is redirected to the home page.
5.  **Home Page:** The `HomePage.jsx` component renders the main chat interface.
    // The `Sidebar.jsx` component displays the list of users.
    // The `ChatContainer.jsx` component displays the messages for the selected chat partner.
6.  **OTP Verification:**
    - If Aadhaar authentication is enabled:
      - User enters their Aadhaar number.
      - Frontend requests OTP from backend.
      - Backend sends OTP to user's registered mobile.
      - User enters OTP on `OtpPage.jsx` or `OtpModal.jsx`.
      - Frontend sends OTP to backend for verification.
      - Upon successful verification, the user is authenticated.
7.  **Navigation:** Navigation between pages is handled using `react-router-dom`.
    // The `Navbar.jsx` component provides navigation links.
    // The `Link` component is used to navigate between pages.
