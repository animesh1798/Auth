# Auth

A full-stack authentication system built with React, Express, and PostgreSQL. It handles user registration and login with bcrypt-hashed passwords, and uses short-lived JWT access tokens paired with longer-lived refresh tokens stored as sessions in the database — so a session can be silently renewed without forcing the user to log in again, and can be revoked server-side on logout.

**Stack**
- **Frontend:** React 19, TypeScript, Vite, React Router
- **Backend:** Express 5, TypeScript, Prisma ORM
- **Database:** PostgreSQL
- **Auth:** JWT (access + refresh tokens) in httpOnly cookies, bcrypt password hashing, session tracking in the database

**Key features**
- User registration and login with server-side validation
- Access/refresh token flow with automatic token refresh via middleware
- Persistent sessions in PostgreSQL, so logout invalidates the session on the server
- Protected routes demonstrating authenticated data retrieval

---

# Important Setup

Before running the backend, make sure to update the `DATABASE_URL` in the `.env` file located inside the `backend` folder.

```env
DATABASE_URL="your_database_connection_string"
```

> **Important:** The application will not work correctly if `DATABASE_URL` is missing or points to an invalid database.

## HOW UI LOOKS

### Login Page
<img width="728" height="557" alt="image" src="https://github.com/user-attachments/assets/df6dabe4-4b2f-41af-911f-a9b5ecfb15a3" />

### Registration Page
<img width="737" height="558" alt="image" src="https://github.com/user-attachments/assets/dcc6815b-3b30-41f3-91f2-a8cf1fe4251e" />

### After Login
<img width="731" height="100" alt="image" src="https://github.com/user-attachments/assets/7c48e981-7f47-4737-a1ba-7494ad055e9a" />

<img width="172" height="50" alt="image" src="https://github.com/user-attachments/assets/10bd6541-e4ce-4261-9428-4dd6fb5d0fcd" /> ---> Prints the User Id in the console. Demonstrates Data retrieval from a protected route

<img width="120" height="54" alt="image" src="https://github.com/user-attachments/assets/6a9022e8-aeeb-4bb6-9268-407e6ddc50e2" /> ---> Logsout and deletes the session from the Database. 

