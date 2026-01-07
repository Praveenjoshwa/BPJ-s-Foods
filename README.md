# FOOD-DEL

A full-stack food delivery application built using the MERN stack (MongoDB, Express, React, Node.js). This project consists of three main components: a customer-facing frontend, an admin panel for management, and a backend server.

## Live Demo

- **Frontend:** [Click Here](https://food-del-frontend.onrender.com)
- **Admin Panel:** [Click Here](https://food-del-admin.onrender.com)
- **Backend API:** [Click Here](https://food-del-backend.onrender.com)


## Project Structure

- **frontend/**: The customer interface where users can browse menus, add items to their cart, and place orders. Built with React and Vite.
- **admin/**: The administrative interface for restaurant owners/managers to add food items, update statuses, and view orders. Built with React and Vite.
- **backend/**: The RESTful API server that handles data processing, authentication, and database interactions. Built with Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend & Admin**: React, Vite, React Router, Axios
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **Authentication**: JWT (JSON Web Tokens), Bcrypt
- **Payment Integration**: Stripe
- **Image Uploads**: Multer
- **Validation**: Validator

## Features

- **User Authentication**: Secure login and registration for users.
- **Product Management**: Admin can add, edit, and remove food items.
- **Cart Functionality**: Users can add items to their cart and adjust quantities.
- **Order Placement**: Users can place orders (integrated with Stripe for payments).
- **Order Management**: Admins can view and update order status.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB (Local or Atlas connection string)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd FOOD-DEL
    ```

2.  **Install Dependencies:**

    You need to install dependencies for each service separately.

    *   **Backend:**
        ```bash
        cd backend
        npm install
        ```

    *   **Frontend:**
        ```bash
        cd ../frontend
        npm install
        ```

    *   **Admin:**
        ```bash
        cd ../admin
        npm install
        ```

### Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=4000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
# Add any other necessary environment variables
```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd backend
    npm run server
    ```
    The server will start on `http://localhost:4000` (or your defined PORT).

2.  **Start the Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    The frontend will typically run on `http://localhost:5173`.

3.  **Start the Admin Panel:**
    ```bash
    cd admin
    npm run dev
    ```
    The admin panel will typically run on `http://localhost:5174` (or another port if 5173 is busy).

## Deployment

This project includes a `render.yaml` file, suggesting it is configured for deployment on [Render](https://render.com/).

## License

This project is open source and available under the [ISC License](LICENSE).
