# Meuble App – QA & MERN Stack Project

## Project Overview
Meuble App is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce application designed with a strong focus on Quality Assurance (QA) and API testing.

During development, Postman was extensively used to test and validate REST APIs, ensuring functional correctness, proper response handling, accurate error management, and overall backend stability.

## Tech Stack
- React.js (Frontend)
- Node.js (Backend)
- Express.js (Server)
- MongoDB (Database)
- Postman (API Testing)
- Git & GitHub (Version Control)

## STLC (Software Testing Life Cycle)
This project follows an industry-standard Software Testing Life Cycle (STLC) approach to ensure structured and reliable testing.

**Requirement Analysis**: Understood system requirements, API behavior, and expected outcomes of the MERN application.  
**Test Planning**: Defined testing strategy including API testing, functional testing, negative testing, and regression testing using Postman.  
**Test Case Design**: Created structured test cases covering authentication, product management, and edge case scenarios.  
**Test Environment Setup**: Configured backend server, MongoDB database, and Postman environment for API execution.  
**Test Execution**: Executed API test cases using Postman for GET, POST, PUT, and DELETE operations and validated responses.  
**Defect Identification & Reporting**: Identified issues related to invalid inputs, authentication failures, and response inconsistencies.  
**Regression Testing**: Re-tested APIs after updates to ensure existing functionality remained stable.  
**Test Closure**: Confirmed system stability after successful validation of all critical APIs.

## QA / Testing Approach

### API Testing (Postman)
- Tested all REST APIs (GET, POST, PUT, DELETE operations)
- Verified HTTP status codes (200, 201, 400, 401, 404, 500)
- Validated JSON response structure and data integrity
- Ensured correct request-response handling and error messages

### Functional Testing
- Validated user authentication (Login / Signup)
- Tested product CRUD operations
- Verified frontend-backend API integration
- Ensured smooth end-to-end application workflow

### Negative Testing
- Tested empty field validations
- Verified invalid login scenarios
- Checked unauthorized API access handling
- Validated incorrect endpoint responses

### Regression Testing
- Re-tested APIs after updates and fixes
- Ensured existing functionality remained unaffected
- Confirmed system stability after changes

## Sample Test Cases

TC01: User login with valid credentials → Login successful  
TC02: User login with invalid credentials → Error message displayed  
TC03: Create product with valid data → Product created successfully  
TC04: Create product with missing fields → Validation error displayed  
TC05: Fetch all products → Product list returned successfully  
TC06: Delete product using valid ID → Product deleted successfully  
TC07: Unauthorized API access → Access denied response returned  

## Key Features
- Secure user authentication system
- Full product lifecycle management (CRUD operations)
- RESTful API architecture using Express.js
- MongoDB database integration
- Responsive React.js frontend
- API validation using Postman

## Key Highlights
- Strong emphasis on API testing using Postman during development
- Validated backend APIs using positive and negative scenarios
- Followed structured QA lifecycle (STLC approach)
- Ensured system reliability and backend stability
- Demonstrates both MERN development and QA testing expertise

## Conclusion
This project demonstrates a strong combination of MERN stack development and industry-standard Quality Assurance practices. Through systematic API testing using Postman, all backend endpoints were validated for functionality, reliability, and error handling.

The testing approach included positive, negative, and regression testing, ensuring application stability and production readiness. This project reflects real-world QA workflows and confirms that the system meets industry-quality standards in terms of API behavior, data integrity, and overall performance.
