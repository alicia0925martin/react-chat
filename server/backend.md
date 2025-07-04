## Backend Documentation

### 🔍 Overview:

-   **Purpose:** The backend handles user authentication, message storage, and real-time communication. It also manages OTP generation, Aadhaar validation, and profile updates.
-   **Key functionalities:**
    -   Handles user registration, login, and authentication.
    -   Manages user profiles.
    -   Stores and retrieves messages.
    -   Facilitates real-time chat using Socket.IO.
    -   Generates and verifies OTPs for authentication.
    -   Validates Aadhaar numbers.

### 📁 Folder Structure:

```
server/
├── .env
├── .gitignore
├── node_modules/
├── package-lock.json
├── package.json
└── src/
    ├── config/
    │   ├── cloudinary.js
    │   ├── database.js
    │   └── socket.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── message.controller.js
    │   └── user.controller.js
    ├── helpers.js
    ├���─ index.js
    ├── middlewares/
    │   └── auth.js
    ├── models/
    │   ├── Message.js
    │   ├── Otp.js
    │   └── User.js
    ├── routes/
    │   ├── auth.route.js
    │   ├── message.route.js
    │   └── user.route.js
    ├── templates/
    │   └── verificationMail.js
    └── utils/
        ├── cloudinaryHelpers.js
        └── mailSender.js
```

-   `.env`: Stores environment-specific configuration, such as database URLs and API keys.
-   `.gitignore`: Specifies intentionally untracked files that Git should ignore.
-   `node_modules/`: Contains the installed Node.js packages.
-   `package-lock.json`: Records the exact versions of the dependencies used in the project.
-   `package.json`: Contains metadata about the project, including dependencies and scripts.
-   `src/`: Contains the main source code for the backend application.
    -   `config/`: Contains configuration files.
        -   `cloudinary.js`: Configures Cloudinary for image storage.
        -   `database.js`: Configures the MongoDB database connection.
        -   `socket.js`: Configures Socket.IO for real-time communication.
    -   `controllers/`: Contains controller functions that handle API requests.
        -   `auth.controller.js`: Handles authentication-related logic (login, signup, OTP verification).
        -   `message.controller.js`: Handles message-related logic (sending, retrieving messages).
        -   `user.controller.js`: Handles user-related logic (profile updates, user listing).
    -   `helpers.js`: Contains helper functions.
    -   `index.js`: The main entry point for the backend application.
    -   `middlewares/`: Contains middleware functions.
        -   `auth.js`: Middleware for authentication.
    -   `models/`: Contains Mongoose models for defining data structures.
        -   `Message.js`: Defines the structure for message data.
        -   `Otp.js`: Defines the structure for OTP data.
        -   `User.js`: Defines the structure for user data.
    -   `routes/`: Contains route definitions.
        -   `auth.route.js`: Defines authentication-related routes.
        -   `message.route.js`: Defines message-related routes.
        -   `user.route.js`: Defines user-related routes.
    -   `templates/`: Contains email templates.
        -   `verificationMail.js`: Contains the email template for verification emails.
    -   `utils/`: Contains utility functions.
        -   `cloudinaryHelpers.js`: Helper functions for Cloudinary.
        -   `mailSender.js`: Handles sending emails.

### 🔌 Dependencies:

-   `bcrypt`: Used for hashing passwords.
    // Provides functions for securely hashing and comparing passwords.
-   `cloudinary`: Used for image storage and management.
    // Provides functions for uploading, transforming, and delivering images.
-   `concurrently`: Used for running multiple commands concurrently.
-   `cookie-parser`: Used for parsing cookies.
-   `cors`: Used for enabling Cross-Origin Resource Sharing (CORS).
    // Allows the frontend to make requests to the backend from a different domain.
-   `dotenv`: Used for loading environment variables from a `.env` file.
    // Allows you to configure the application using environment variables.
-   `express`: The core framework for building the backend application.
    // Provides routing, middleware, and other essential features.
-   `express-fileupload`: Used for handling file uploads.
-   `jsonwebtoken`: Used for generating and verifying JSON Web Tokens (JWTs).
    // Used for authentication and authorization.
-   `mongoose`: Used for interacting with the MongoDB database.
    // Provides an object-relational mapping (ORM) for MongoDB.
-   `nodemailer`: Used for sending emails.
    // Allows the backend to send verification emails and other notifications.
-   `nodemon`: Used for automatically restarting the server during development.
-   `otp-generator`: Used for generating OTPs.
-   `socket.io`: Used for enabling real-time communication.
    // Provides a bidirectional communication channel between the client and server.
-   `validator`: Used for validating data.

### 📄 Route-Level Breakdown:

#### - auth.route.js:

-   **Purpose:** Defines authentication-related routes (login, signup, OTP verification).
-   **Routes:**
    -   `/login`: Handles user login.
        // Maps the route to the `login` function in `auth.controller.js`.
    -   `/signup`: Handles user signup.
        // Maps the route to the `signup` function in `auth.controller.js`.
    -   `/verify-otp`: Handles OTP verification.
        // Maps the route to the `verifyOTP` function in `auth.controller.js`.
-   **Logic:**
    // The routes define the API endpoints for authentication.
    // The controller functions handle the actual authentication logic.

#### - message.route.js:

-   **Purpose:** Defines message-related routes (sending, retrieving messages).
-   **Routes:**
    -   `/send-message`: Handles sending a new message.
        // Maps the route to the `sendMessage` function in `message.controller.js`.
    -   `/get-messages`: Handles retrieving messages for a specific chat.
        // Maps the route to the `getMessages` function in `message.controller.js`.
-   **Logic:**
    // The routes define the API endpoints for message management.
    // The controller functions handle the actual message logic.

#### - user.route.js:

-   **Purpose:** Defines user-related routes (profile updates, user listing).
-   **Routes:**
    -   `/update-profile`: Handles updating user profile information.
        // Maps the route to the `updateProfile` function in `user.controller.js`.
    -   `/get-all-users`: Handles retrieving a list of all users.
        // Maps the route to the `getAllUsers` function in `user.controller.js`.
-   **Logic:**
    // The routes define the API endpoints for user management.
    // The controller functions handle the actual user logic.

### 🔐 Security or Auth:

-   **Authentication:** JWTs are used for authentication.
    // When a user logs in successfully, the backend generates a JWT and sends it back to the client.
    // The client then includes the JWT in the headers of subsequent requests.
    // The backend verifies the JWT to authenticate the user.
-   **CORS:** CORS is enabled to allow the frontend to make requests to the backend.
-   **OTP Protection:** OTPs are used to protect against unauthorized access.
    // The backend generates an OTP and sends it to the user's registered email number.
    // The user must then enter the OTP to verify their identity.

### 📡 Communication:

-   The frontend and backend communicate using HTTP requests.
-   The frontend sends requests to the backend API endpoints.
-   The backend processes the requests and sends responses back to the frontend.
-   Socket.IO is used for real-time communication.

**Sample OTP Flow:**

1.  User enters their Aadhaar number on the frontend.
2.  Frontend sends a request to the `/send-otp` API endpoint on the backend.
    // The request includes the user's Aadhaar number.
3.  Backend validates the Aadhaar number.
4.  If the Aadhaar number is valid, the backend generates an OTP and stores it in the database.
5.  The backend sends the OTP to the user's registered mobile number.
6.  The frontend displays a modal or page for OTP input.
7.  The user enters the OTP on the frontend.
8.  The frontend sends a request to the `/verify-otp` API endpoint on the backend.
    // The request includes the OTP.
9.  The backend verifies the OTP against the stored OTP.
10. If the OTP is valid, the backend authenticates the user and generates a JWT.
11. The backend sends the JWT back to the frontend.
