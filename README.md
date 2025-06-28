## Table of Contents
- [Project Overview](#project-overview)
- [Folder and File Overview](#folder-and-file-overview)
- [Authentication Flow](#authentication-flow)
- [User Management](#user-management)
- [Messaging System](#messaging-system)
- [Cloudinary Integration](#cloudinary-integration)
- [Helper Functions](#helper-functions)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [Suggestions for Improvement](#suggestions-for-improvement)
- [API Endpoints](#api-endpoints)
- [Frontend Overview](#frontend-overview)
- [Testing](#testing)

## Project Overview

This is a real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) with Cloudinary for media uploads and JWT-based authentication. It allows users to sign in, chat with others, and send messages with optional files.

## Folder and File Overview:

### `client/`
- This folder contains the React-based frontend of the application.
- It includes components, styles, and the main application logic.
- Uses `vite` for building and serving the application.

### `server/`
- This folder contains the Node.js/Express backend of the application.
- It handles API endpoints, database interactions, authentication, and business logic.
- Key files include:
    - `.env`: Environment variables (Cloudinary credentials, JWT secret).
    - `index.js`: Main entry point for the server.
    - `src/`: Contains the application source code.
        - `config/`: Database and Cloudinary configurations.
        - `controllers/`: Handles request logic.
        - `middlewares/`: Authentication middleware.
        - `models/`: Mongoose schemas for data models.
        - `routes/`: Defines API routes.
        - `utils/`: Helper functions.

## Authentication Flow:

### `authMiddleware.js`
- This middleware is responsible for verifying JWT tokens and authenticating users.

```javascript
// Example from src/middlewares/auth.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

### JWT Usage
- When a user logs in, the server generates a JWT token containing the user's ID and other relevant information.
- This token is then sent back to the client, which stores it (e.g., in local storage or a cookie).

### Protected Routes
- Protected routes require a valid JWT token in the `Authorization` header.
- The `authMiddleware` verifies the token and extracts the user's ID.  If the token is invalid or missing, the request is rejected.
- Example:

```javascript
// Example from src/routes/user.route.js
import { verifyToken } from "../middlewares/auth.js";
router.get("/", verifyToken, getAllUsers);
```

## User Management:

### `User.js` (Model)
- Defines the Mongoose schema for the User model.
- Includes fields like `username`, `email`, `password`, `profilePicture`, etc.

```javascript
// Example from src/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
```

### `user.controller.js` (getUsers)
- Handles logic for fetching all users except the current user.
- This is useful for displaying a list of users to chat with.

```javascript
// Example from src/controllers/user.controller.js
export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const users = await User.find({ _id: { $ne: userId } }).select([  // $ne: not equal to
      "email",
      "username",
      "profilePicture",
      "_id",
    ]);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};
```

## Messaging System:

### `Message.js` (Model)
- Defines the Mongoose schema for the Message model.
- Includes fields like `senderId`, `receiverId`, `message`, `file`, and `fileType`.

```javascript
// Example from src/models/Message.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    file: {
      type: String,
      default: null,
    },
    fileType: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
```

### `message.controller.js` (sendMessage, getMessageHistory)
- `sendMessage`: Handles logic for sending a new message, including text and file uploads.
- `getMessageHistory`: Handles logic for retrieving the message history between two users.

```javascript
// Example from src/controllers/message.controller.js
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    let { file } = req.body;

    if (!senderId || !receiverId || (!message && !file)) {
      return res
        .status(400)
        .send("SenderId, ReceiverId, and message or file are required.");
    }

    let fileType = null;
    if (file) {
      fileType = getFileType(file);
      validateFileType(fileType, res);
      file = await uploadFileToCloudinary(file, "messages");
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      file,
      fileType,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message: ", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getMessageHistory = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error getting messages: ", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
};
```

### File Uploads
- File uploads are handled using Cloudinary.
- The `sendMessage` controller extracts the file from the request body, uploads it to Cloudinary using `uploadFileToCloudinary`, and stores the returned URL in the `file` field of the `Message` model.

## Cloudinary Integration:

### `cloudinaryHelpers.js`
- Contains helper functions for interacting with the Cloudinary API.

### `uploadFileToCloudinary`
- Uploads a file to Cloudinary.
- Takes the file (as a base64 encoded string) and the folder name as input.
- Returns the URL of the uploaded file.

```javascript
// Example from src/utils/cloudinaryHelpers.js
import cloudinary from "./cloudinary";

export const uploadFileToCloudinary = async (file, folder) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: "chat-app",
      folder,
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error: ", error);
    throw new Error("File upload failed");
  }
};
```

### File Type Validation
- Before uploading a file to Cloudinary, the file type is validated to ensure it's an allowed type (image, video, document).
- The `validateFileType` function checks the file type and throws an error if it's not valid.

## Helper Functions:

### `getFileType`
- Extracts the file type from a base64 encoded string.
- Returns the file type (e.g., "image/jpeg", "video/mp4", "application/pdf").

```javascript
// Example from src/helpers.js
export function getFileType(file) {
  const prefix = file.substring(0, 50);
  const type = prefix.substring(prefix.indexOf("data:") + 5, prefix.indexOf(";base64"));
  return type;
}
```

### `validateFileType`
- Validates the file type.
- Accepts the file type and the response object as input.
- If the file type is not in the allowed list, it sends a 400 error with an appropriate message.

```javascript
// Example from src/helpers.js
export function validateFileType(fileType, res) {
  const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (!allowedTypes.includes(fileType)) {
    res.status(400).send("Invalid file type");
    throw new Error("Invalid file type");
  }
}
```

## Error Handling:
- All controllers use `try...catch` blocks to handle errors.
- Errors are logged to the console and a 500 status code is returned with a JSON object containing an error message.
- Specific error messages are returned for different types of errors (e.g., invalid file type, missing parameters).
- Responses are formatted as JSON objects with a status code and a message or data.

## Environment Variables:
- The `.env` file contains important configuration variables.
- Key variables include:
    - `MONGODB_URL`: The URL of the MongoDB database.
    - `JWT_SECRET`: The secret key used to sign JWT tokens.
    - `CLOUDINARY_CLOUD_NAME`: The name of the Cloudinary cloud.
    - `CLOUDINARY_API_KEY`: The API key for the Cloudinary account.
    - `CLOUDINARY_API_SECRET`: The API secret for the Cloudinary account.

## Suggestions for Improvement:
- **Project Structure:** Consider using a more modular structure, with separate folders for services, utilities, and models.  This will improve code organization and maintainability.
- **Code Quality:** Add unit tests and integration tests to improve code quality and prevent regressions.  Use a linter and code formatter to enforce consistent coding style.
- **Security:** Implement rate limiting to prevent brute-force attacks.  Use HTTPS to encrypt communication between the client and server.  Sanitize user inputs to prevent cross-site scripting (XSS) attacks.
- **Real-time Functionality:** Integrate WebSockets using Socket.IO for real-time message updates and user presence.  Currently, the client would have to poll the server to check for new messages.
- **File Handling:**  Consider using streams for file uploads to improve performance and reduce memory usage.
- **Error Handling:** Implement a centralized error handling middleware to handle errors consistently across the application.
- **Scalability:**  Consider using a message queue (e.g., RabbitMQ or Kafka) to handle asynchronous tasks such as sending notifications and processing file uploads.

## API Endpoints
### Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Log in user and return JWT

### Users
- `GET /api/users` – Get list of users (protected)

### Messages
- `POST /api/messages` – Send a message
- `GET /api/messages/:userId/:otherUserId` – Get conversation history

## Frontend Overview

### Pages/Views
- **Login**: Handles user login.
- **Register**: Handles user registration.
- **Chat Interface**: Main interface for chatting with other users.

### Important Components
- **ChatBox**: Displays the conversation between two users.
- **UserList**: Displays the list of available users to chat with.
- **MessageInput**: Input field for typing and sending messages.

### API Calls
- API calls are structured using `fetch`.

### Authentication
- The authentication token (JWT) is stored in the browser's local storage after successful login.
- This token is included in the `Authorization` header of subsequent API requests to protected endpoints.

## Testing
- Unit tests can be added for controller functions using Jest
- Integration tests for APIs using Supertest
- Frontend testing with React Testing Library