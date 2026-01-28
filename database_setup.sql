-- Create database
CREATE DATABASE IF NOT EXISTS makeup_brand;
USE makeup_brand;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0.00,
    shades INT DEFAULT 1,
    description TEXT,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_by INT,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@makeupbrand.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample products
INSERT INTO products (name, category, brand, price, rating, shades, description, image) VALUES
('Radiant Foundation', 'Face', 'Glow Beauty', 45.00, 4.5, 12, 'A lightweight foundation that provides natural coverage with a radiant finish.', '/images/foundation.jpg'),
('Velvet Lipstick', 'Lips', 'Lux Lips', 25.00, 4.8, 8, 'Creamy lipstick with long-lasting color and moisturizing formula.', '/images/lipstick.jpg'),
('Smoky Eye Palette', 'Eyes', 'Eye Glam', 35.00, 4.7, 15, 'Professional eyeshadow palette perfect for creating smoky eye looks.', '/images/eyeshadow.jpg'),
('Blush Duo', 'Cheeks', 'Cheek Chic', 30.00, 4.6, 2, 'Two complementary blush shades for natural-looking flushed cheeks.', '/images/blush.jpg'),
('Highlighter Stick', 'Face', 'Glow Beauty', 28.00, 4.9, 1, 'Buildable highlighter that adds a luminous glow to any skin tone.', '/images/highlighter.jpg'),
('Mascara Volume', 'Eyes', 'Lash Luxe', 22.00, 4.4, 1, 'Volumizing mascara that lengthens and defines lashes.', '/images/mascara.jpg');

-- Insert sample news
INSERT INTO news (title, content) VALUES
('New Winter Collection Launch', 'Discover our latest winter makeup collection featuring warm tones and glowy finishes perfect for the holiday season.'),
('Holiday Gift Guide', 'Find the perfect makeup gifts for your loved ones with our curated holiday gift guide.');

-- Create content table for dynamic pages
CREATE TABLE IF NOT EXISTS content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page VARCHAR(50) NOT NULL,
    section VARCHAR(100) NOT NULL,
    title VARCHAR(255),
    content TEXT,
    image VARCHAR(255),
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Insert sample content for About page
INSERT INTO content (page, section, title, content) VALUES
('about', 'hero', 'About Glow Beauty', 'We believe that makeup should feel like skincare. Our mission is to create high-performance products that enhance your natural beauty while caring for your skin.'),
('about', 'mission', 'Our Mission', 'At Glow Beauty, we are committed to providing makeup that not only looks amazing but also feels incredible on your skin. Every product is carefully formulated with nourishing ingredients that hydrate and protect.'),
('about', 'values', 'Our Values', 'Quality, Innovation, and Sustainability are at the core of everything we do. We source the finest ingredients and use cutting-edge technology to create products that deliver real results.');

-- Insert sample content for Contact page
INSERT INTO content (page, section, title, content) VALUES
('contact', 'hero', 'Get In Touch', 'Have questions about our products or need beauty advice? We''d love to hear from you!'),
('contact', 'info', 'Contact Information', 'Email: hello@glowbeauty.com
Phone: (555) 123-4567
Address: 123 Beauty Street, Glamour City, GC 12345');
