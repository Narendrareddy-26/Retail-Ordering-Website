# Retail Auth Module - React + Spring Boot

Complete authentication and authorization module with role-based access control.

## Project Structure

```
person1-auth-react-springboot/
├── frontend/                  (React Application)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── pages/
│   │   │   ├── UserDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   └── Dashboard.css
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
└── backend/                   (Spring Boot Application)
    ├── src/main/java/com/retail/auth/
    │   ├── controller/
    │   │   └── AuthController.java
    │   ├── service/
    │   │   └── AuthService.java
    │   ├── model/
    │   │   ├── User.java
    │   │   ├── AuthRequest.java
    │   │   └── AuthResponse.java
    │   ├── repository/
    │   │   └── UserRepository.java
    │   ├── security/
    │   │   ├── JwtTokenProvider.java
    │   │   └── JwtAuthenticationFilter.java
    │   ├── config/
    │   │   └── SecurityConfig.java
    │   └── AuthServiceApplication.java
    ├── src/main/resources/
    │   ├── application.properties
    │   └── db-setup.sql
    └── pom.xml
```

## Features

✅ User Registration (with email validation)
✅ User Login with JWT Token
✅ Role-Based Access Control (User & Admin)
✅ JWT Authentication & Authorization
✅ Password Hashing with BCrypt
✅ CORS Support
✅ Protected API Endpoints
✅ User Profile Management
✅ Role-specific Dashboards

## Frontend - React

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation & Setup

```bash
cd frontend
npm install
```

### Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### Components

1. **Login.jsx** - Role-based login form
   - Select role (User/Admin)
   - Enter email and password
   - JWT token stored in localStorage

2. **Signup.jsx** - User registration form
   - Name, email, password validation
   - Password strength requirements
   - Role selection

3. **UserDashboard.jsx** - User dashboard
   - View profile
   - User-specific features

4. **AdminDashboard.jsx** - Admin dashboard
   - Admin-only access
   - Admin features

## Backend - Spring Boot

### Prerequisites
- Java 17+
- Maven 3.8+
- PostgreSQL 12+

### Database Setup

1. Install PostgreSQL
2. Run the SQL script to create database and tables:
   ```bash
   psql -U postgres -f src/main/resources/db-setup.sql
   ```

3. Update `application.properties`:
   ```properties
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   ```

### Build & Run

```bash
# Build
mvn clean install

# Run
mvn spring-boot:run
```

Server will run on `http://localhost:8080`

### API Endpoints

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | /api/auth/register | ❌ | Register new user |
| POST | /api/auth/login | ❌ | Login user |
| GET | /api/auth/profile | ✅ | Get user profile |
| PUT | /api/auth/profile | ✅ | Update user profile |
| GET | /api/auth/admin-only | ✅ | Admin-only route |

### Example Requests

**Register:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

**Get Profile (Protected):**
```bash
curl -X GET http://localhost:8080/api/auth/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Demo Credentials

### User Account
- Email: user@example.com
- Password: user@123
- Role: user

### Admin Account
- Email: admin@example.com
- Password: admin@123
- Role: admin

## Technologies Used

### Frontend
- React 18.2.0
- React Router v6
- Axios
- CSS3

### Backend
- Spring Boot 3.1.0
- Spring Security
- Spring Data JPA
- JWT (jjwt)
- BCrypt
- PostgreSQL

## Security Features

✅ JWT Token-based Authentication
✅ Password Hashing with BCrypt (10 rounds)
✅ CORS Configuration
✅ Stateless Session Management
✅ Role-based Authorization
✅ Protected API Endpoints

## Environment Setup

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8080/api
```

### Backend (application.properties)
```
jwt.secret=your_secret_key_change_in_production
jwt.expiration=86400000
spring.datasource.url=jdbc:postgresql://localhost:5432/retail_db
spring.datasource.username=postgres
spring.datasource.password=password
```

## Running Both Applications

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## File Structure & Descriptions

### Frontend Files

- **Login.jsx** - Login form with role selection
- **Signup.jsx** - Registration form with password requirements
- **UserDashboard.jsx** - User profile dashboard
- **AdminDashboard.jsx** - Admin control panel
- **authService.js** - API service for authentication
- **Auth.css** - Styling for auth pages
- **Dashboard.css** - Styling for dashboards

### Backend Files

- **AuthServiceApplication.java** - Main Spring Boot app entry point
- **AuthController.java** - REST endpoints for authentication
- **AuthService.java** - Business logic for authentication
- **User.java** - User entity model
- **UserRepository.java** - Database access layer
- **JwtTokenProvider.java** - JWT token generation and validation
- **JwtAuthenticationFilter.java** - JWT filter for request validation
- **SecurityConfig.java** - Spring Security configuration

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues
- Ensure PostgreSQL is running
- Check credentials in `application.properties`
- Verify database exists

### CORS Issues
- Check SecurityConfig.java corsConfigurationSource()
- Ensure frontend URL is whitelisted

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] User roles and permissions management
- [ ] Audit logging
- [ ] Rate limiting
- [ ] Refresh token implementation
- [ ] OAuth2 integration

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
