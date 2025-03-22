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
2. Install dependencies for both frontend and backend:
   # Frontend
      cd frontend
      npm install

   # Backend
      cd ../backend
      npm install
   
### Running the Application
1.  Start the backend server:
       cd backend
       npm run dev
2.  Start the frontend development server:
       cd ../frontend
       npm run dev
