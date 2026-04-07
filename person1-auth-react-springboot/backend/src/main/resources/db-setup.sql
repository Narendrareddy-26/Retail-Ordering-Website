# Database Setup Script for Retail Auth Service
# Create this database and run it in PostgreSQL

CREATE DATABASE retail_db;

\c retail_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at BIGINT DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Insert sample users (passwords: user@123 for user, admin@123 for admin)
INSERT INTO users (name, email, password_hash, role) VALUES
('Sample User', 'user@example.com', '$2a$10$Dy8.mJLm8f0V.6bVJcF1WuD3ck9bP7M0bvP5bKq5nE7K9Q0nMVHWG', 'user'),
('Admin User', 'admin@example.com', '$2a$10$h4rT1ZuuHZeF5rcB4Rz2B.Dy8.mJLm8f0V.6bVJcF1WuD3ck9bP7M0', 'admin');
