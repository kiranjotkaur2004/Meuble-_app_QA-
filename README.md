# Meuble QA - MERN Stack E-Commerce Application with API Testing

## Project Name
Meuble QA - Full Stack E-Commerce Web Application with Postman API Testing

## Project Overview
Meuble is a full-stack **MERN (MongoDB, Express, React, Node.js)** e-commerce web application where users can browse products, add items to cart, and place orders.

Along with development, **API testing was performed using Postman** to ensure backend reliability, correctness of responses, and data validation.

This project demonstrates both:
- Full Stack Development Skills
- Software QA (API Testing using Postman)

## Objective
- Build a full-stack e-commerce web application
- Validate REST APIs using Postman
- Perform CRUD operations testing
- Ensure backend and database data integrity
- Perform manual + API testing as QA Engineer

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express.js
- Database: MongoDB
- API Testing Tool: Postman
- Version Control: Git & GitHub

## Application URLs
- Frontend: http://localhost:5173  
- Backend: http://localhost:8080 (or configured port)

## Features

### User Features
- User Registration
- User Login (Authentication)
- Browse Products
- Add to Cart
- Place Orders

### Admin Features
- Add Products
- Update Products
- Delete Products
- Manage Orders
  
## QA Testing Activities (Postman)

- Tested REST APIs using Postman
- Validated CRUD operations (Create, Read, Update, Delete)
- Verified authentication APIs (Login/Register)
- Checked HTTP status codes (200, 201, 400, 401, 404, 500)
- Validated JSON response structure
- Performed negative testing (invalid inputs, empty fields)
- Used Postman Collection Runner for bulk execution
- Verified data consistency in MongoDB

## API Test Cases

### 1. Authentication API

**POST /api/auth/register**
- Verify status code is 201
- Verify user is created successfully
- Verify email is stored correctly in database

**POST /api/auth/login**
- Verify status code is 200
- Verify JWT token is generated
- Verify invalid credentials return 401

### 2. Product API

**GET /api/products**
- Verify status
