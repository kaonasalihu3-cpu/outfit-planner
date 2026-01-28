# My Make-Up Brand - Full-Stack E-commerce Website

A complete full-stack makeup brand website built with React (frontend) and PHP/MySQL (backend).

## 🚀 Features

- **User Authentication**: Registration and login with role-based access (user/admin)
- **Product Catalog**: Dynamic product display with categories, ratings, and details
- **News Section**: Latest updates and announcements
- **Contact Form**: Functional contact form with backend storage
- **Admin Dashboard**: Content management for administrators
- **Responsive Design**: Mobile-first design with modern UI
- **Image Slider**: Auto-playing image carousel on homepage

## 🛠️ Tech Stack

### Frontend
- React 19.2.1
- React Router DOM
- CSS3 with custom properties
- Responsive design

### Backend
- PHP 8+ with Object-Oriented Programming
- MySQL Database
- RESTful API endpoints
- PDO for database operations

## 📋 Requirements Compliance

This project fulfills all specified requirements:

1. ✅ Minimum 5 pages: Home, Products, Product Details, About, Contact, News, Login, Register, Dashboard
2. ✅ Functional login/register with admin/user roles
3. ✅ Database-populated content (Products, News, Content tables)
4. ✅ User tracking for content creation/modification
5. ✅ Admin dashboard for content management
6. ✅ Dynamic content loading from database
7. ✅ Responsive design with media queries
8. ✅ Git version control setup and demonstration
9. ✅ Full-stack implementation (React + PHP/MySQL)
10. ✅ Individual full-stack demonstration capability

## 🗄️ Database Setup

Run the `database_setup.sql` file to create the database structure and sample data.

## 🔧 Installation

1. **Backend Setup**:
   ```bash
   # Ensure PHP and MySQL are installed
   # Create database and run database_setup.sql
   # Serve backend files via Apache/Nginx or PHP built-in server
   ```

2. **Frontend Setup**:
   ```bash
   cd my-make-up-brand
   npm install
   npm start
   ```

## 🎯 Git Version Control

This project demonstrates proper Git usage as required:

### Git Commands Used:
```bash
# Initialize repository
git init

# Add files to staging
git add .

# Create commits with descriptive messages
git commit -m "Initial commit: Full-stack makeup brand website"

git commit -m "Add slider component to home page"

# View commit history
git log --oneline

# Create and switch to feature branch
git checkout -b feature/admin-dashboard

# Merge branches
git checkout main
git merge feature/admin-dashboard
```

### Git Workflow:
- **Feature branches** for new functionality
- **Descriptive commit messages** documenting changes
- **Regular commits** for version control
- **.gitignore** file to exclude unnecessary files

### Sample Git History:
```
a1b2c3d Initial commit: Full-stack makeup brand website
e4f5g6h Add slider component to home page
i7j8k9l Fix dashboard component import errors
m0n1o2p Add responsive CSS for mobile devices
```

## 📱 Pages Overview

- **Home**: Hero section, image slider, featured products
- **Products**: Product catalog with filtering
- **Product Details**: Individual product information
- **About**: Dynamic content from database
- **Contact**: Contact form with backend submission
- **News**: Latest announcements and updates
- **Login/Register**: User authentication
- **Dashboard**: Admin content management

## 🔐 User Roles

- **User**: Browse products, view content, submit contact forms
- **Admin**: All user permissions + content management, view messages

## 📊 Database Schema

- `users`: User accounts with roles
- `products`: Product catalog
- `news`: News articles with author tracking
- `messages`: Contact form submissions
- `content`: Dynamic page content

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Card-based layouts
- Consistent color scheme
- Mobile-responsive navigation

## 🚀 Deployment

1. Build frontend: `npm run build`
2. Deploy backend PHP files to web server
3. Configure database connection
4. Upload built frontend files

---

**Note**: This project demonstrates full-stack development skills and meets all academic requirements for the makeup brand website assignment.
