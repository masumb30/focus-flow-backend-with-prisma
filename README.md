# ⚡ FocusFlow Backend API

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-v7.x-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT%20%2B%20Bcrypt-FF6C37?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

A high-performance, modular RESTful API backend for **FocusFlow** — a modern productivity platform for task management, project tracking, subtask nesting, and time logging. 

Built with **Node.js**, **Express v5**, **TypeScript**, **Prisma ORM 7** with PostgreSQL adapter, and **JWT authentication** with dual support for Bearer Headers and HTTP-Only cookies.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Getting Started & Installation](#-getting-started--installation)
- [Environment Configuration](#-environment-configuration)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
  - [System & Health](#1-system--health)
  - [Authentication (`/auth`)](#2-authentication-auth)
  - [Standalone Todos (`/todos`)](#3-standalone-todos-todos)
  - [Projects & Tasks (`/projects`)](#4-projects--tasks-projects)
- [Frontend Integration Guide](#-frontend-integration-guide)
- [Available Scripts](#-available-scripts)
- [License](#-license)

---

## 🚀 Features

- **🔐 Robust JWT Authentication**: Secure user registration and sign-in using `bcryptjs` password hashing and JWT tokens (supports both `Authorization: Bearer <token>` headers and secure HTTP-Only cookies).
- **📋 Standalone Quick Todos**: Lightweight personal task list with simple status toggles (`pending` / `completed`).
- **📁 Project Management**: Create, view, and organize personal or team projects (`PERSONAL`, `TEAM`).
- **🌳 Nested Subtasks Engine**: Hierarchical depth for project tasks using self-referencing task parent-child relationships.
- **⏱️ Focus & Time Logging**: Track total focus time per task (`totalTime`) and manage state machine statuses (`IDEAL`, `PENDING`, `RUNNING`, `COMPLETE`, `PAUSED`).
- **🛡️ Data Security & Cascading Deletes**: User-isolated records with Prisma `onDelete: Cascade` to ensure clean database maintenance.
- **🌐 Modern Express 5 & ESM**: Standardized ES Module imports with full TypeScript safety.

---

## 🛠 Tech Stack & Architecture

- **Runtime Environment**: Node.js (ES Modules `type: module`)
- **Web Framework**: Express v5 (`express@^5.2.1`)
- **Database**: PostgreSQL
- **ORM & Client**: Prisma 7 (`@prisma/client`, `@prisma/adapter-pg`)
- **Security & Validation**: `bcryptjs` for password hashing, `jsonwebtoken` for session verification, `cors` & `cookie-parser` for web client communication.
- **Project Structure**:
  ```text
  src/
  ├── app.ts                  # Express application setup, CORS & global error handlers
  ├── server.ts               # Server bootstrap & graceful shutdown handler
  ├── lib/
  │   └── prisma.ts           # Prisma Client instantiation with PostgreSQL adapter
  ├── middlewares/
  │   └── auth.middleware.ts  # JWT verification middleware
  ├── routes/
  │   └── index.ts            # Central route mounting
  └── services/
      ├── auth/               # User authentication (controller, service, routes)
      ├── project/            # Project & task engine (controller, service, routes, interfaces)
      └── todos/              # Quick todo management (controller, service, routes)
  ```

---

## 💻 Getting Started & Installation

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) database instance running locally or hosted (e.g. Supabase, Neon, Railway)

### Step 1: Clone the Repository & Install Dependencies
```bash
git clone https://github.com/masumb30/focus-flow-backend-with-prisma.git
cd focus-flow-backend-with-prisma
npm install
```

### Step 2: Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Database Connection String
DATABASE_URL="postgresql://postgres:password@localhost:5432/focusflow?schema=public"

# JWT Secret Key
JWT_SECRET="your_super_secret_jwt_key_change_in_production"

# Server Port (Default: 4000)
PORT=4000

# Allowed Frontend Origin for CORS
CLIENT_URL="http://localhost:3000"
```

### Step 3: Run Database Migrations & Generate Prisma Client
```bash
# Run migrations to apply database schema
npm run db:migrate

# Generate Prisma client bindings
npx prisma generate
```

### Step 4: Start Development Server
```bash
npm run dev
```
The server will start listening at `http://localhost:4000`.

---

## 🗄 Database Schema

The database model is configured via Prisma (`prisma/schema.prisma`):

```mermaid
erDiagram
    USER ||--o{ TODO : owns
    USER ||--o{ PROJECT : owns
    PROJECT ||--o{ TASK : contains
    TASK ||--o{ TASK : "subTasks (parent_id)"

    USER {
        string id PK
        string name
        string email UK
        string password
        string avatarUrl
        datetime createdAt
        datetime updatedAt
    }

    TODO {
        string id PK
        string title
        string status
        datetime date
        string userId FK
    }

    PROJECT {
        string id PK
        string name
        string description
        datetime date
        ProjectType type
        string userId FK
        datetime createdAt
        datetime updatedAt
    }

    TASK {
        string id PK
        string title
        datetime date
        TaskStatus status
        int totalTime
        string projectId FK
        string parentId FK
        datetime createdAt
        datetime updatedAt
    }
```

### Enums
- **`ProjectType`**: `PERSONAL` | `TEAM`
- **`TaskStatus`**: `IDEAL` | `PENDING` | `RUNNING` | `COMPLETE` | `PAUSED`

---

## 📖 API Documentation

All API routes (except Auth and Health endpoints) require authentication. Pass the JWT token via:
1. **Authorization Header**: `Authorization: Bearer <your_jwt_token>`
2. **HTTP-Only Cookie**: `token=<your_jwt_token>`

---

### 1. System & Health

#### **Check Server Health**
- **Endpoint**: `/health`
- **Method**: `GET`
- **Authentication**: None
- **Description**: Returns current system status and server timestamp.
- **Request Body**: None
- **Response**:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-08-12T06:42:11.000Z"
  }
  ```
- **Status Codes**: `200 OK`

---

#### **User Sign Out**
- **Endpoint**: `/logout`
- **Method**: `POST`
- **Authentication**: None
- **Description**: Clears the HTTP-Only `token` cookie on the client side.
- **Request Body**: None
- **Response**:
  ```json
  {
    "success": true,
    "message": "Signed out successfully."
  }
  ```
- **Status Codes**: `200 OK`, `500 Internal Server Error`

---

### 2. Authentication (`/auth`)

#### **Register New User**
- **Endpoint**: `/auth/signup`
- **Method**: `POST`
- **Authentication**: None
- **Description**: Registers a new user account with hashed password credentials.
- **Request Body**:
  ```json
  {
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "password": "securepassword123",
    "avatarUrl": "https://example.com/avatar.jpg"
  }
  ```
  *(Note: `avatarUrl` is optional)*
- **Response**:
  - `201 Created`:
    ```json
    {
      "success": true,
      "message": "User registered successfully.",
      "data": {
        "id": "cm7abc1230000xx01",
        "name": "Alex Mercer",
        "email": "alex@example.com",
        "avatarUrl": "https://example.com/avatar.jpg",
        "createdAt": "2026-08-12T06:42:11.000Z",
        "updatedAt": "2026-08-12T06:42:11.000Z"
      }
    }
    ```
- **Status Codes**:
  - `201 Created`: Account successfully created.
  - `400 Bad Request`: Missing `name`, `email`, or `password`, or email is already registered.

---

#### **Sign In User**
- **Endpoint**: `/auth/signin`
- **Method**: `POST`
- **Authentication**: None
- **Description**: Authenticates user credentials, sets an HTTP-Only cookie `token`, and returns JWT token and user profile.
- **Request Body**:
  ```json
  {
    "email": "alex@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "message": "Signed in successfully.",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "cm7abc1230000xx01",
        "name": "Alex Mercer",
        "email": "alex@example.com",
        "avatarUrl": "https://example.com/avatar.jpg",
        "createdAt": "2026-08-12T06:42:11.000Z",
        "updatedAt": "2026-08-12T06:42:11.000Z"
      }
    }
    ```
- **Status Codes**:
  - `200 OK`: Sign in successful.
  - `400 Bad Request`: Email or password omitted.
  - `401 Unauthorized`: Invalid email or incorrect password.

---

### 3. Standalone Todos (`/todos`)

#### **Create Quick Todo**
- **Endpoint**: `/todos`
- **Method**: `POST`
- **Authentication**: Required (`Bearer <token>`)
- **Description**: Creates a new quick personal todo item.
- **Request Body**:
  ```json
  {
    "title": "Review daily focus sprint goals"
  }
  ```
- **Response**:
  - `201 Created`:
    ```json
    {
      "success": true,
      "message": "Task created successfully.",
      "data": {
        "id": "cm7todo1230000xx02",
        "title": "Review daily focus sprint goals",
        "status": "pending",
        "date": "2026-08-12T06:42:11.000Z",
        "userId": "cm7abc1230000xx01"
      }
    }
    ```
- **Status Codes**:
  - `201 Created`: Todo created.
  - `400 Bad Request`: Title is required or invalid string.
  - `401 Unauthorized`: Missing or invalid authentication token.
  - `500 Internal Server Error`: Database error.

---

#### **Get All User Todos**
- **Endpoint**: `/todos`
- **Method**: `GET`
- **Authentication**: Required (`Bearer <token>`)
- **Description**: Fetches all standalone todos belonging to the authenticated user ordered by newest `date`.
- **Request Body**: None
- **Response**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "message": "Tasks retrieved successfully.",
      "data": [
        {
          "id": "cm7todo1230000xx02",
          "title": "Review daily focus sprint goals",
          "status": "pending",
          "date": "2026-08-12T06:42:11.000Z",
          "userId": "cm7abc1230000xx01"
        }
      ]
    }
    ```
- **Status Codes**:
  - `200 OK`: Todos retrieved.
  - `401 Unauthorized`: Missing or invalid authentication token.
  - `500 Internal Server Error`: Server failure.

---

#### **Update Todo Status**
- **Endpoint**: `/todos/:id`
- **Method**: `PATCH`
- **Authentication**: Required (`Bearer <token>`)
- **Description**: Toggles or sets the status of a specific todo item.
- **Path Parameters**: `id` — ID of the todo item to update.
- **Request Body**:
  ```json
  {
    "status": "completed"
  }
  ```
  *(Allowed values: `"pending"`, `"completed"`)*
- **Response**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "message": "Task status updated successfully.",
      "data": {
        "id": "cm7todo1230000xx02",
        "title": "Review daily focus sprint goals",
        "status": "completed",
        "date": "2026-08-12T06:42:11.000Z",
        "userId": "cm7abc1230000xx01"
      }
    }
    ```
- **Status Codes**:
  - `200 OK`: Status successfully updated.
  - `400 Bad Request`: Missing/invalid ID or status is not `"pending"` or `"completed"`.
  - `401 Unauthorized`: Missing or invalid authentication token.

---

### 4. Projects & Tasks (`/projects`)

#### **Create New Project**
- **Endpoint**: `/projects`
- **Method**: `POST`
- **Authentication**: Required (`Bearer <token>`)
- **Description**: Creates a new project container.
- **Request Body**:
  ```json
  {
    "name": "FocusFlow Web Client",
    "description": "Next.js & Tailwind CSS dashboard for time tracking",
    "type": "PERSONAL"
  }
  ```
  *(Note: `description` is optional; `type` is optional: `"PERSONAL"` or `"TEAM"`, defaults to `"PERSONAL"`)*
- **Response**:
  - `201 Created`:
    ```json
    {
      "success": true,
      "message": "Project created successfully.",
      "data": {
        "id": "cm7proj1230000xx03",
        "name": "FocusFlow Web Client",
        "description": "Next.js & Tailwind CSS dashboard for time tracking",
        "date": "2026-08-12T06:42:11.000Z",
        "type": "PERSONAL",
        "userId": "cm7abc1230000xx01",
        "createdAt": "2026-08-12T06:42:11.000Z",
        "updatedAt": "2026-08-12T06:42:11.000Z"
      }
    }
    ```
- **Status Codes**:
  - `201 Created`: Project created.
  - `400 Bad Request`: Project `name` missing or invalid.
  - `401 Unauthorized`: Missing or invalid authentication token.
  - `500 Internal Server Error`: Server failure.

---

#### **Get All Projects**
- **Endpoint**: `/projects`
- **Method**: `GET`
- **Authentication**: Required (`Bearer <token>`)
- **Description**: Retrieves a list of all projects owned by the user, including task count summary (`_count.tasks`).
- **Request Body**: None
- **Response**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "message": "Projects retrieved successfully.",
      "data": [
        {
          "id": "cm7proj1230000xx03",
          "name": "FocusFlow Web Client",
          "description": "Next.js & Tailwind CSS dashboard for time tracking",
          "date": "2026-08-12T06:42:11.000Z",
          "type": "PERSONAL",
          "createdAt": "2026-08-12T06:42:11.000Z",
          "updatedAt": "2026-08-12T06:42:11.000Z",
          "_count": {
            "tasks": 4
          }
        }
      ]
    }
    ```
- **Status Codes**:
  - `200 OK`: Projects retrieved.
  - `401 Unauthorized`: Missing or invalid authentication token.
  - `500 Internal Server Error`: Server failure.

---

#### **Get Project Details (with Nested Tasks)**
- **Endpoint**: `/projects/:id`
- **Method**: `GET`
- **Authentication**: Required (`Bearer <token>`)
- **Description**: Fetches complete project details by ID, including top-level tasks and their nested subtasks.
- **Path Parameters**: `id` — Project ID.
- **Request Body**: None
- **Response**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "message": "Project details retrieved successfully.",
      "data": {
        "id": "cm7proj1230000xx03",
        "name": "FocusFlow Web Client",
        "description": "Next.js & Tailwind CSS dashboard for time tracking",
        "date": "2026-08-12T06:42:11.000Z",
        "type": "PERSONAL",
        "userId": "cm7abc1230000xx01",
        "createdAt": "2026-08-12T06:42:11.000Z",
        "updatedAt": "2026-08-12T06:42:11.000Z",
        "tasks": [
          {
            "id": "cm7task1230000xx04",
            "title": "Authentication Integration",
            "date": "2026-08-12T06:42:11.000Z",
            "status": "RUNNING",
            "totalTime": 1200,
            "projectId": "cm7proj1230000xx03",
            "parentId": null,
            "createdAt": "2026-08-12T06:42:11.000Z",
            "updatedAt": "2026-08-12T06:42:11.000Z",
            "subTasks": [
              {
                "id": "cm7task1230000xx05",
                "title": "Store JWT in LocalStorage / Cookies",
                "date": "2026-08-12T06:42:11.000Z",
                "status": "COMPLETE",
                "totalTime": 600,
                "projectId": "cm7proj1230000xx03",
                "parentId": "cm7task1230000xx04",
                "createdAt": "2026-08-12T06:42:11.000Z",
                "updatedAt": "2026-08-12T06:42:11.000Z"
              }
            ]
          }
        ]
      }
    }
    ```
- **Status Codes**:
  - `200 OK`: Project details fetched.
  - `401 Unauthorized`: Missing or invalid authentication token.
  - `404 Not Found`: Project ID does not exist or belong to the user.
  - `500 Internal Server Error`: Server error.

---

#### **Delete Project**
- **Endpoint**: `/projects/:id`
- **Method**: `DELETE`
- **Authentication**: Required (`Bearer <token>`)
- **Description**: Deletes a project and all associated tasks/subtasks via database cascade.
- **Path Parameters**: `id` — Project ID.
- **Request Body**: None
- **Response**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "message": "Project deleted successfully."
    }
    ```
- **Status Codes**:
  - `200 OK`: Project successfully deleted.
  - `401 Unauthorized`: Missing or invalid authentication token.
  - `404 Not Found`: Project not found or unauthorized.
  - `500 Internal Server Error`: Server failure.

---

#### **Add Task / Subtask to Project**
- **Endpoint**: `/projects/:id/tasks`
- **Method**: `POST`
- **Authentication**: Required (`Bearer <token>`)
- **Description**: Adds a task to a project. If `parentId` is provided, it creates a nested subtask under that parent task.
- **Path Parameters**: `id` — Project ID.
- **Request Body**:
  ```json
  {
    "title": "Build Timer Control Component",
    "parentId": "cm7task1230000xx04",
    "totalTime": 0
  }
  ```
  *(Note: `parentId` is optional for root tasks; `totalTime` is optional, default `0`)*
- **Response**:
  - `201 Created`:
    ```json
    {
      "success": true,
      "message": "Task added to project successfully.",
      "data": {
        "id": "cm7task1230000xx06",
        "title": "Build Timer Control Component",
        "date": "2026-08-12T06:42:11.000Z",
        "status": "IDEAL",
        "totalTime": 0,
        "projectId": "cm7proj1230000xx03",
        "parentId": "cm7task1230000xx04",
        "createdAt": "2026-08-12T06:42:11.000Z",
        "updatedAt": "2026-08-12T06:42:11.000Z",
        "subTasks": []
      }
    }
    ```
- **Status Codes**:
  - `201 Created`: Task added.
  - `400 Bad Request`: Missing task `title`.
  - `401 Unauthorized`: Missing or invalid authentication token.
  - `404 Not Found`: Project not found.
  - `500 Internal Server Error`: Server error.

---

#### **Update Task Status**
- **Endpoint**: `/projects/tasks/:taskId/status`
- **Method**: `PATCH`
- **Authentication**: Required (`Bearer <token>`)
- **Description**: Updates the workflow state status of a project task or subtask.
- **Path Parameters**: `taskId` — Task ID to update.
- **Request Body**:
  ```json
  {
    "status": "RUNNING"
  }
  ```
  *(Allowed values: `"IDEAL"`, `"PENDING"`, `"RUNNING"`, `"COMPLETE"`, `"PAUSED"`)*
- **Response**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "message": "Task status updated successfully.",
      "data": {
        "id": "cm7task1230000xx06",
        "title": "Build Timer Control Component",
        "date": "2026-08-12T06:42:11.000Z",
        "status": "RUNNING",
        "totalTime": 0,
        "projectId": "cm7proj1230000xx03",
        "parentId": "cm7task1230000xx04",
        "createdAt": "2026-08-12T06:42:11.000Z",
        "updatedAt": "2026-08-12T06:42:11.000Z"
      }
    }
    ```
- **Status Codes**:
  - `200 OK`: Status updated.
  - `400 Bad Request`: Invalid `status` enum value.
  - `401 Unauthorized`: Missing or invalid authentication token.
  - `500 Internal Server Error`: Database update error.

---

## ⚡ Frontend Integration Guide

Here is how to easily connect your React / Next.js / Vue client to this backend:

### 1. Authenticating & Storing Token
```typescript
// Example: User Sign In
const handleSignIn = async (email: string, password: string) => {
  const response = await fetch('http://localhost:4000/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (data.success) {
    // Store token in localStorage or manage via HTTP-Only cookie automatically
    localStorage.setItem('focusflow_token', data.token);
    console.log('Signed in user:', data.user);
  }
};
```

### 2. Making Authenticated API Calls
```typescript
// Example: Fetching Projects with Bearer Token
const fetchProjects = async () => {
  const token = localStorage.getItem('focusflow_token');

  const response = await fetch('http://localhost:4000/projects', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (result.success) {
    return result.data; // Array of projects
  }
};
```

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the development server with live reload using `tsx watch` |
| `npm run build` | Generates Prisma client & compiles TypeScript into `./dist` |
| `npm start` | Runs compiled production server (`node dist/server.js`) |
| `npm run db:migrate` | Applies database migrations using `prisma migrate dev` |
| `npm run db:studio` | Opens Prisma Studio UI to inspect & manage database records |

---

## 📄 License

This project is licensed under the **ISC License**. Developed for the **FocusFlow** ecosystem.
