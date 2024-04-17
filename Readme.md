# Authentication Template

This project provides a template for implementing authentication in Node.js using Express.js with TypeScript. Additionally, it utilizes Nodemailer for sending emails.

## Routes

- `/api/users`: This route handles user-related operations such as registration, updating user information, and deleting users.
    ```json
    {
        "firstName": "",
        "lastName": "",
        "password": "",
        "mode": "",
        "contact": "",
    }
    ```
- `/api/otp`: This route is responsible for generating and verifying OTP (One-Time Password) for user authentication.
    ```json
    {
        "mode": "",
        "contact": "",
        "otp": "",
    }
    ```
- `/api/auth`: This route manages user authentication and token generation.
    ```json
    {
        "password": "",
        "mode": "",
        "contact": "",
    }
    ```

## Technologies Used

- **Node.js**: A JavaScript runtime for server-side development.
- **Express.js**: A web application framework for Node.js, providing a robust set of features for building web and mobile applications.
- **TypeScript**: A superset of JavaScript that adds static typing and other features to the language.
- **Nodemailer**: A module for Node.js applications to allow easy email sending.

## How to Build

To build and run the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ota0912/auth-template.git
   ```

2. Navigate to the project directory:

   ```bash
   cd auth-template
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root directory by copying `.env.example`
   - Place in the adequate values for the variables


5. Build and run the project in development mode:

   ```bash
   npm run dev
   ```

   This will start the server using `ts-node`.

6. For production build:

   ```bash
   npm run prod
   ```

   This command will transpile TypeScript files to JavaScript and then start the server.

7. Access the API routes as described above.
