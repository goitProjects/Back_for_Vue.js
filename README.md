# rest-api-travel
# Points Tracker Backend for Vue Learning Program

## Overview
This backend application is designed for a Vue-based learning program, enabling users to record and manage points of interest they have visited. It facilitates user interaction with their profile to add, update, and delete points.

## Features

### 1. Points Management
- **Retrieve Points**: Users can retrieve all points they have visited, which are stored under their profile.
- **Add Points**: Users can add new points with details like title, description, and images.
- **Update Points**: Users can update the details of the points they have visited.
- **Delete Points**: Users can delete points from their profile.

### 2. User Authentication
- **Signup**: New users can create an account by providing their name, email, and password. The application checks for existing emails and encrypts passwords before storing them.
- **Login**: Users can log in with their email and password to receive access tokens for secure routes.
- **Refresh Token**: Implements token refresh functionality to maintain user sessions.
- **Logout**: Users can log out, which clears their session information from the database.

### 3. Backend Functionality
- **Models**: Utilizes Mongoose models for storing and managing `Points` and `User` data.
- **Middlewares**: Custom middlewares for authentication and authorization using JWT and Passport.
- **Security**: Passwords are encrypted using bcrypt before being stored in the database.
- **Tokens**: Generation and validation of access and refresh tokens to manage user sessions.

## Technology Stack
- The backend is implemented with Node.js using Mongoose for database operations and Express.js for routing.