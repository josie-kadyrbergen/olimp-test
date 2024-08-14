# To-Do List Application

This is a simple To-Do List application built with React, NestJS, and PostgreSQL. The application supports both list and Kanban board views for managing tasks. Users can register, log in, and manage their tasks with ease.

## Prerequisites

- Node.js v20 or higher
- PostgreSQL

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:josie-kadyrbergen/olimp-test.git
   cd olimp-test
2. Backend Setup:
   
   ```bash
   cd todo-app-backend
   npm i
   
 For start: 
 
         npm start
3. Create a .env file in the backend directory:
  ```dotenv
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=your_postgres_user
    DATABASE_PASSWORD=your_postgres_password
    DATABASE_NAME=todo_app
    JWT_SECRET=your_secret_key
   ```

3. Frontend Setup:
   
   ```bash
   cd todo-app-frontend
   npm i

Add backend url to package.json example:
    
    "proxy": "http://localhost:3000",

For start: 

      npm start
