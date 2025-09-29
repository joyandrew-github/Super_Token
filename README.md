# Super_Token

Super_Token is a full-stack authentication system built with **JWT (JSON Web Token)** for secure user authentication. It includes a **React frontend** and a **Node.js backend** with JWT-based authentication and role-based access control.

---

## Features

- User **registration and login**.
- JWT-based **authentication and authorization**.
- Password **hashing** for security.
- Protected routes with **role-based access**.
- Frontend built with **React.js** and **Tailwind CSS**.
- Backend with **Node.js**, **Express**, and **Prisma ORM**.
- Ready-to-use **API endpoints** for authentication.

---

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express, Prisma ORM, JWT
- **Database:** SQLite/PostgreSQL (configured via Prisma)
- **Authentication:** JWT (Access & Refresh tokens)

---

Super_Token/
│
├─ JWT-AUTH-FRONTEND/ # React frontend
│ ├─ src/
│ │ ├─ components/ # LoginForm, SignupForm
│ │ ├─ context/ # AuthContext
│ │ └─ pages/ # Dashboard
│ └─ public/ # Static files
│
├─ JWT-AUTH/ # Node.js backend
│ ├─ src/
│ │ ├─ controllers/ # Auth controllers
│ │ ├─ routes/ # Auth routes
│ │ └─ middleware/ # Auth middleware
│ └─ prisma/ # Database schema & migrations
│
└─ README.md # Project documentation

##Backend Setup
cd JWT-AUTH
npm install
# Configure .env file with your database URL and JWT secrets
npx prisma migrate dev --name init
npm run dev


##Frontend Setup
cd ../JWT-AUTH-FRONTEND
npm install
npm run dev


API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login a user
GET	/api/auth/me	Get logged-in user info
POST	/api/auth/refresh	Refresh access token


## Folder Structure

