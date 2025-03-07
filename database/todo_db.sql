-- Create the database (change the name if you prefer)
CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;

-- Create the "users" table
CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (username),
    UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the "notes" table
CREATE TABLE IF NOT EXISTS notes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    note_date DATE NOT NULL,
    note_time TIME NOT NULL,
    title VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE notes ADD COLUMN status ENUM('on-going', 'completed', 'missed') DEFAULT 'on-going';