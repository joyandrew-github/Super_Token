# Super_Token

Super_Token is a **full-stack authentication system** using **JWT (JSON Web Token)** for secure user authentication.  
It features a **React frontend** and a **Node.js backend** with JWT-based authentication and role-based access control.

---

## Features

- User registration and login  
- JWT-based authentication and authorization  
- Password hashing for security  
- Protected routes with role-based access  
- Frontend: React.js + Tailwind CSS  
- Backend: Node.js + Express + Prisma ORM  
- Ready-to-use API endpoints for authentication  

---

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS  
- **Backend:** Node.js, Express, Prisma ORM, JWT  
- **Database:** SQLite/PostgreSQL (via Prisma)  
- **Authentication:** JWT (Access & Refresh Tokens)  

---

## 📂 Folder Structure

Super_Token/
├── JWT-AUTH-FRONTEND/ # React frontend
│ ├── src/
│ │ ├── components/ # LoginForm, SignupForm
│ │ ├── context/ # AuthContext
│ │ └── pages/ # Dashboard
│ └── public/ # Static files
│
├── JWT-AUTH/ # Node.js backend
│ ├── src/
│ │ ├── controllers/ # Auth controllers
│ │ ├── routes/ # Auth routes
│ │ └── middleware/ # Auth middleware
│ └── prisma/ # Database schema & migrations
│
└── README.md # Project documentation

---

## Backend Setup

1. Navigate to backend folder:


cd JWT-AUTH
npm install



DATABASE_URL=<your-database-url>
ACCESS_TOKEN_SECRET=<your-access-token-secret>
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>


npx prisma migrate dev --name init
npm run dev



cd ../JWT-AUTH-FRONTEND
npm install
npm run dev



| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | /api/auth/register | Register a new user     |
| POST   | /api/auth/login    | Login a user            |
| GET    | /api/auth/me       | Get logged-in user info |
| POST   | /api/auth/refresh  | Refresh access token    |

