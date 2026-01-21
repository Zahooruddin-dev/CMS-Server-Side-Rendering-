# CMS Platform - Server Side Rendering

A full-featured Content Management System built with Node.js, Express.js, EJS templating, and PostgreSQL database with JWT authentication.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-v4.19-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14+-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Features

- **User Authentication** - JWT-based authentication with secure password hashing
- **Role-Based Access Control** - Admin and user roles
- **Post Management** - Create, read, update, and delete blog posts
- **Category Management** - Organize posts with categories
- **Draft/Published Status** - Control post visibility
- **Responsive Design** - Mobile-friendly UI with modern CSS
- **Server-Side Rendering** - Fast page loads with EJS templates
- **Flash Messages** - User feedback for actions
- **Input Validation** - Secure form validation

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Template Engine:** EJS
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Session Management:** express-session
- **Styling:** Pure CSS3 with modern design

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/zahooruddin-dev/cms-server-side-rendering.git
cd cms-server-side-rendering
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up PostgreSQL Database

Open PostgreSQL terminal and run:

```sql
CREATE DATABASE cms_db;

\c cms_db

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_categories (
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, category_id)
);
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/cms_db
JWT_SECRET=mySuperSecretJWTKey123456789abcdefghijklmnopqrstuvwxyz
JWT_EXPIRE=7d
SESSION_SECRET=mySessionSecretKey987654321zyxwvutsrqponmlkjihgfedcba
```

**Note:** Replace `yourpassword` with your PostgreSQL password.

### 5. Run the Application

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 👤 Creating Admin User

1. Register a new user at `http://localhost:3000/auth/register`

2. Open PostgreSQL and update the user role:

```sql
\c cms_db
UPDATE users SET role = 'admin' WHERE email = 'mzkhan886@gmail.com';
```

3. Login at `http://localhost:3000/auth/login`

## 📁 Project Structure

```
cms-project/
├── config/
│   └── db.js                 # Database configuration
├── middleware/
│   └── auth.js               # Authentication middleware
├── models/
│   ├── User.js               # User model
│   ├── Post.js               # Post model
│   └── Category.js           # Category model
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── admin.js              # Admin routes
│   └── public.js             # Public routes
├── views/
│   ├── partials/             # Reusable components
│   ├── auth/                 # Login/Register pages
│   ├── admin/                # Admin dashboard pages
│   ├── public/               # Public-facing pages
│   └── error.ejs             # Error page
├── public/
│   └── css/
│       └── style.css         # Application styles
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── server.js                # Main server file
├── package.json             # Dependencies
└── README.md                # Documentation
```

## 🎨 Features Overview

### Public Features
- View published blog posts
- Read individual articles
- Browse posts by category
- Responsive homepage

### Admin Features
- Admin dashboard with statistics
- Create new blog posts
- Edit existing posts
- Delete posts
- Manage categories
- Draft/Publish post status

## 🔒 Security Features

- Passwords hashed with bcryptjs
- JWT token authentication
- HTTP-only cookies
- SQL injection protection with parameterized queries
- Input validation with express-validator
- Session management
- CSRF protection ready

## 📝 API Routes

### Public Routes
- `GET /` - Homepage
- `GET /post/:slug` - Single post view
- `GET /category/:slug` - Category view

### Authentication Routes
- `GET /auth/register` - Registration page
- `POST /auth/register` - Register new user
- `GET /auth/login` - Login page
- `POST /auth/login` - Authenticate user
- `GET /auth/logout` - Logout user

### Admin Routes (Protected)
- `GET /admin/dashboard` - Admin dashboard
- `GET /admin/posts` - Manage posts
- `GET /admin/posts/new` - Create post form
- `POST /admin/posts/create` - Create new post
- `GET /admin/posts/edit/:id` - Edit post form
- `POST /admin/posts/update/:id` - Update post
- `POST /admin/posts/delete/:id` - Delete post
- `GET /admin/categories` - Manage categories
- `POST /admin/categories/create` - Create category
- `POST /admin/categories/delete/:id` - Delete category

## 🎯 Usage Examples

### Creating a Post

1. Login as admin
2. Navigate to "Posts" → "New Post"
3. Fill in title and content
4. Select status (Draft/Published)
5. Click "Create Post"

### Managing Categories

1. Navigate to "Categories"
2. Enter category name
3. Click "Add Category"
4. Categories auto-generate slugs

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Verify database exists
psql -l
```

### Port Already in Use
Change the PORT in `.env` file to a different port number.

### Module Not Found
```bash
npm install
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Zahoor Uddin**
- Email: mzkhan886@gmail.com
- GitHub: [@zahooruddin-dev](https://github.com/zahooruddin-dev)

## 🙏 Acknowledgments

- Express.js community
- PostgreSQL documentation
- EJS templating engine
- Node.js ecosystem

## 📞 Support

For support, email mzkhan886@gmail.com or open an issue on GitHub.

---

⭐ Star this repository if you find it helpful!