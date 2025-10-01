# Super_Token 🔐

A **full-stack authentication system** built with **JWT (JSON Web Token)** for secure user authentication. Features a modern **React frontend** and a robust **Node.js backend** with JWT-based authentication and role-based access control.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.x-61dafb)

---

## ✨ Features

- ✅ User registration and login
- 🔐 JWT-based authentication (Access & Refresh tokens)
- 🔒 Secure password hashing with bcrypt
- 🛡️ Protected routes with role-based access control
- ⚛️ Modern React frontend with Tailwind CSS
- 🚀 RESTful API with Express.js
- 💾 Prisma ORM for type-safe database operations
- 📱 Responsive design

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Database
- **SQLite** / **PostgreSQL** (via Prisma)

---

## 📂 Project Structure

```
Super_Token/
├── JWT-AUTH-FRONTEND/          # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable components (LoginForm, SignupForm)
│   │   ├── context/            # AuthContext for global state
│   │   ├── pages/              # Page components (Dashboard, Home)
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── public/                 # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── JWT-AUTH/                   # Node.js backend application
│   ├── src/
│   │   ├── controllers/        # Business logic (authController.js)
│   │   ├── routes/             # API routes (authRoutes.js)
│   │   ├── middleware/         # Authentication middleware
│   │   ├── utils/              # Helper functions
│   │   └── server.js           # Express server setup
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── migrations/         # Database migrations
│   ├── package.json
│   └── .env.example
│
└── README.md                   # You are here!
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/super_token.git
cd super_token
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd JWT-AUTH

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Configure your `.env` file:**

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secrets (use strong random strings)
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_here
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_here

# Server
PORT=5000
NODE_ENV=development
```

**Initialize the database:**

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

**Start the backend server:**

```bash
npm run dev
```

✅ Backend server running at `http://localhost:5000`

---

### 3️⃣ Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd JWT-AUTH-FRONTEND

# Install dependencies
npm install

# Create .env file (optional)
echo "VITE_API_URL=http://localhost:5000" > .env
```

**Start the development server:**

```bash
npm run dev
```

✅ Frontend application running at `http://localhost:5173`

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint              | Description                    | Auth Required |
|--------|-----------------------|--------------------------------|---------------|
| POST   | `/api/auth/register`  | Register a new user account    | ❌            |
| POST   | `/api/auth/login`     | Login with email & password    | ❌            |
| GET    | `/api/auth/me`        | Get current user profile       | ✅            |
| POST   | `/api/auth/refresh`   | Refresh access token           | ✅ (Refresh)  |
| POST   | `/api/auth/logout`    | Logout and invalidate tokens   | ✅            |

### Request/Response Examples

#### Register User

**Request:**
```json
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

#### Login

**Request:**
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

#### Get Current User

**Request:**
```http
GET /api/auth/me
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "createdAt": "2025-10-01T10:30:00.000Z"
  }
}
```

---

## 🗄️ Database Schema

```prisma
model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  password     String
  name         String?
  role         String   @default("user")
  refreshToken String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## 🔐 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds before storage
- **JWT Tokens**: 
  - Access tokens (short-lived, 15 minutes)
  - Refresh tokens (long-lived, 7 days)
- **HTTP-Only Cookies**: Refresh tokens stored in HTTP-only cookies
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Request validation and sanitization
- **Role-Based Access Control**: User roles for authorization
- **Protected Routes**: Middleware authentication checks

---

## 🎨 Frontend Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Context API**: Global authentication state management
- **Protected Routes**: Automatic redirects for unauthorized users
- **Form Validation**: Client-side validation for better UX
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Token Management**: Automatic token refresh

---

## 🧪 Testing the Application

1. **Start both servers** (backend and frontend)
2. **Open your browser** and navigate to `http://localhost:5173`
3. **Register a new account** with your email and password
4. **Login** with your credentials
5. **Access the dashboard** - you should see protected content
6. **Test logout** functionality
7. **Try accessing protected routes** when logged out

---

## 📝 Environment Variables

### Backend (JWT-AUTH/.env)

```env
# Database Connection
DATABASE_URL="file:./dev.db"                    # SQLite database
# For PostgreSQL: "postgresql://user:password@localhost:5432/dbname"

# JWT Configuration
ACCESS_TOKEN_SECRET=your_access_token_secret    # Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
REFRESH_TOKEN_SECRET=your_refresh_token_secret  # Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
ACCESS_TOKEN_EXPIRY=15m                         # Access token validity
REFRESH_TOKEN_EXPIRY=7d                         # Refresh token validity

# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (JWT-AUTH-FRONTEND/.env)

```env
VITE_API_URL=http://localhost:5000              # Backend API URL
```

---

## 🚀 Deployment

### Backend Deployment (Example: Railway/Render)

1. Create a PostgreSQL database
2. Update `DATABASE_URL` in environment variables
3. Set all environment variables
4. Deploy using Git integration
5. Run migrations: `npx prisma migrate deploy`

### Frontend Deployment (Example: Vercel/Netlify)

1. Build the project: `npm run build`
2. Set `VITE_API_URL` to your backend URL
3. Deploy the `dist` folder
4. Configure redirects for SPA routing

---

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run migrate      # Run database migrations
npm run studio       # Open Prisma Studio
```

**Frontend:**
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

Please make sure to:
- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

---

## 🐛 Known Issues

- [ ] Add email verification
- [ ] Implement password reset functionality
- [ ] Add OAuth providers (Google, GitHub)
- [ ] Add rate limiting
- [ ] Add unit and integration tests

---

## 📚 Additional Resources

- [JWT Documentation](https://jwt.io/introduction)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [JWT.io](https://jwt.io) for JWT implementation guidance
- [Prisma](https://www.prisma.io) for the amazing ORM
- [React Community](https://react.dev/community) for continuous inspiration
- [Tailwind CSS](https://tailwindcss.com) for utility-first CSS framework

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐️!

---

**Made with ❤️ using React, Node.js, and JWT**
