# Coupon Distribution System

This project is a web application for managing coupon distribution, built with a **Next.js** frontend and a **Node.js** backend.

## Features

- **Admin Login**: Secure login for administrators.
- **Coupon Management**: Create, update, and manage coupons.
- **User Management**: Manage users and their claims.
- **Responsive Design**: Optimized for all devices.

## Project Structure

### Frontend

The frontend is built with **Next.js** and resides in the `frontend` folder.

#### Key Files and Folders

- [`src/app/admin/login/page.tsx`](frontend/src/app/admin/login/page.tsx): Admin login page.
- [`src/components`](frontend/src/components): Reusable UI components.
- [`next.config.ts`](frontend/next.config.ts): Next.js configuration file.

### Backend

The backend is built with **Node.js** and resides in the `backend` folder.

#### Key Files and Folders

- [`src/app.ts`](backend/src/app.ts): Main application entry point.
- [`src/server.ts`](backend/src/server.ts): Server configuration.
- [`src/models`](backend/src/models): Database models for admin, claims, and coupons.
- [`src/routes`](backend/src/routes): API routes for admin and coupon management.

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/coupon-distribution.git
   cd coupon-distribution
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:

   ```bash
   cd ../frontend
   npm run dev
   ```

---

## API Documentation

### Admin Routes

#### POST `/admin/login`

- **Description**: Logs in an admin and returns a token.
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "admin@1234"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "jwt-token"
  }
  ```

#### POST `/admin/logout`

- **Description**: Logs out the admin by clearing the token.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logout successful"
  }
  ```

#### POST `/admin/coupon/add`

- **Description**: Adds a new coupon.
- **Request Body**:
  ```json
  {
    "code": "COUPON123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Coupon added successfully",
    "couponId": "coupon-id"
  }
  ```

#### PUT `/admin/coupon/update/:id`

- **Description**: Updates an existing coupon.
- **Request Body**:
  ```json
  {
    "code": "NEWCODE123",
    "status": "available"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Coupon updated successfully"
  }
  ```

#### DELETE `/admin/coupon/delete/:id`

- **Description**: Deletes a coupon by ID.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Coupon deleted successfully"
  }
  ```

#### GET `/admin/coupon/list`

- **Description**: Retrieves a list of all coupons.
- **Response**:
  ```json
  [
    {
      "id": "coupon-id",
      "code": "COUPON123",
      "status": "available"
    }
  ]
  ```

---

### Coupon Routes

#### POST `/coupon/claim`

- **Description**: Claims an available coupon for the user.
- **Response**:
  ```json
  {
    "message": "Coupon claimed successfully",
    "couponCode": "COUPON123"
  }
  ```

#### GET `/coupon/list`

- **Description**: Retrieves all coupons (public endpoint).
- **Response**:
  ```json
  [
    {
      "id": "coupon-id",
      "code": "COUPON123",
      "status": "claimed"
    }
  ]
  ```

--- 

For more details, refer to the respective route files in the `backend/src/routes` directory.
