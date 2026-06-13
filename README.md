# Meuble App – QA & MERN Stack Project

## Project Overview
Meuble App is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce application designed with a strong focus on Quality Assurance (QA) and API testing.
During development, I extensively used **Postman to test and validate REST APIs, ensuring system reliability, correct response handling, proper error management, and overall backend stability**.

## Tech Stack
- React.js (Frontend)
- Node.js (Backend)
- Express.js (Server)
- MongoDB (Database)
- Postman (API Testing)
- Git & GitHub (Version Control)

## QA / Testing Approach

### API Testing (Postman)
- Tested all REST APIs including GET, POST, PUT, DELETE operations
- Verified HTTP status codes (200, 201, 400, 401, 404, 500)
- Validated JSON response structure and data accuracy
- Ensured proper request-response handling and error messages

### Functional Testing
- Validated user authentication (Login / Signup)
- Tested product CRUD operations
- Verified API integration with frontend
- Ensured smooth end-to-end application flow

### Negative Testing
- Tested empty field submissions
- Verified invalid login credentials handling
- Checked unauthorized API access scenarios
- Validated incorrect endpoint responses

### Regression Testing
- Re-tested APIs after updates and fixes
- Ensured existing functionality remained stable
- Confirmed no breaking changes after modifications

## Sample Test Cases

TC01: User login with valid credentials → Login successful  
TC02: User login with invalid password → Error message displayed  
TC03: Create product with valid data → Product created successfully  
TC04: Create product with missing fields → Validation error displayed  
TC05: Fetch all products → Product list returned successfully  
TC06: Delete product using valid ID → Product deleted successfully  
TC07: Unauthorized API access → Access denied error returned  

## Key Features
- Secure user authentication system
- Full product management (CRUD operations)
- RESTful API architecture using Express.js
- MongoDB database integration
- Responsive React.js frontend
- API testing and validation using Postman

## Key Highlights
- Strong focus on API testing using Postman during development
- Ensured backend reliability through structured QA testing
- Validated all major endpoints with positive and negative scenarios
- Improved understanding of REST API lifecycle and QA processes
- Demonstrates both MERN development and QA testing skills

## Conclusion
This project demonstrates a strong combination of MERN stack development and Quality Assurance practices. Through systematic API testing using Postman, all endpoints were validated for functionality, error handling, and data accuracy. Proper testing of positive and negative scenarios ensured that the software is stable, reliable, and meets quality standards. As a result, the application is verified to be secure and dependable in terms of API behavior and overall system performance.
