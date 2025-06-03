# User Auth Example

A simple Node.js/TypeScript Express server with user authentication, using MongoDB and environment variables.

## Features

- User signup and login
- Password hashing with salt
- Session token generation and cookie-based authentication
- MongoDB integration
- TypeScript support

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- npm

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/user-auth-example.git
   cd user-auth-example
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory (see `.env.example` for reference):**
   ```
   MONGO_URI=your_mongodb_connection_string
   COOKIE_NAME=NARESH_AUTH
   PORT=5000
   ```

4. **Run the server (with environment variables):**
   ```bash
   npx ts-node -r dotenv/config src/server.ts
   ```
   Or, if you have `ts-node` installed globally:
   ```bash
   ts-node -r dotenv/config src/server.ts
   ```

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Signup

- **POST** `/api/v1/auth/signup`
- **Body:**  
  ```json
  {
    "username": "yourname",
    "email": "you@example.com",
    "password": "yourpassword"
  }
  ```

### Login

- **POST** `/api/v1/auth/login`
- **Body:**  
  ```json
  {
    "email": "you@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:** Sets a cookie with the session token.

## Project Structure

```
src/
  controllers/      # Route handlers (authentication logic)
  db/               # Database connection
  middleware/       # Express middleware
  models/           # Mongoose models
  router/           # Express routers
  utils/            # Utility functions (hashing, random, etc.)
  server.ts         # Entry point
```

## Notes

- Make sure your MongoDB URI is correct in the `.env` file.
- The cookie name is configurable via the `COOKIE_NAME` environment variable.
- For production, update cookie options (domain, secure, etc.) as needed.

## License

MIT 