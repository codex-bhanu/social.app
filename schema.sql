-- Create Database
CREATE DATABASE IF NOT EXISTS social_app;
USE social_app;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Storing hashed password
    profilePicture VARCHAR(255) DEFAULT 'assets/person/noAvatar.png',
    coverPicture VARCHAR(255) DEFAULT 'assets/person/noCover.png',
    `desc` VARCHAR(255) DEFAULT 'Welcome to my profile page!',
    city VARCHAR(100) DEFAULT NULL,
    `from` VARCHAR(100) DEFAULT NULL,
    relationship ENUM('Single', 'Married', 'In a relationship', 'It is complicated') DEFAULT 'Single',
    address VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    `desc` TEXT DEFAULT NULL,
    photo VARCHAR(255) DEFAULT NULL,
    location VARCHAR(100) DEFAULT NULL,
    feeling VARCHAR(50) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Post Likes Table (Prevents double liking)
CREATE TABLE IF NOT EXISTS post_likes (
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Bookmarks Table
CREATE TABLE IF NOT EXISTS bookmarks (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- 5. Messages Table (Chats)
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Friend Requests Table
CREATE TABLE IF NOT EXISTS friend_requests (
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    `status` ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (sender_id, receiver_id),
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. Stories Table (24hr Auto-Delete Model)
CREATE TABLE IF NOT EXISTS stories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    media_url VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. Story Viewers Table
CREATE TABLE IF NOT EXISTS story_viewers (
    story_id INT NOT NULL,
    user_id INT NOT NULL,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (story_id, user_id),
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 9. Groups Table
CREATE TABLE IF NOT EXISTS groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_private BOOLEAN DEFAULT FALSE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- 10. Group Members Table (with Roles and Approval State)
CREATE TABLE IF NOT EXISTS group_members (
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('admin', 'mod', 'member') DEFAULT 'member',
    status ENUM('pending', 'approved') DEFAULT 'approved',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 11. Group Posts Mapping Table
CREATE TABLE IF NOT EXISTS group_posts (
    post_id INT NOT NULL,
    group_id INT NOT NULL,
    PRIMARY KEY (post_id, group_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- 12. Reactions Table (Enforcing UNIQUE user-post reactions)
CREATE TABLE IF NOT EXISTS reactions (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    reaction_type ENUM('like', 'love', 'haha', 'angry') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- 13. Events Table (with RSVP limit guard)
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    date TIMESTAMP NOT NULL,
    location VARCHAR(150) NOT NULL,
    capacity INT DEFAULT 100,
    is_private BOOLEAN DEFAULT FALSE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- 14. Event RSVPs Table
CREATE TABLE IF NOT EXISTS event_rsvps (
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    status ENUM('going', 'maybe', 'not_going') DEFAULT 'going',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================================================================
-- MOCK DATA INSERTS
-- =========================================================================

-- Insert default user: Bhanu Pratap Yadav
INSERT INTO users (id, username, email, password, profilePicture, coverPicture, `desc`, city, `from`, relationship, address, phone)
VALUES (
    999,
    'Bhanu Pratap Yadav',
    'bhanuy9648@gmail.com',
    '$2b$10$hashed_password_placeholder', -- Replace with hashed bcrypt password in production
    'assets/person/bhanu.jpg',
    'assets/post/profile_banner.png',
    'Hello my friends!',
    'Palghar',
    'Maharashtra',
    'Single',
    'YadavNagar, Santoshbhawan, NalasoparaEast, Palghar, Maharashtra-401209',
    '7617896131'
) ON DUPLICATE KEY UPDATE id=id;

-- Insert other mockup users
INSERT INTO users (id, username, email, password, profilePicture, coverPicture)
VALUES 
(1, 'Safak Kocaoglu', 'safak@gmail.com', '$2b$10$mock_hash', 'assets/person/1.jpeg', 'assets/post/1.jpeg'),
(2, 'Janell Shrum', 'janell@gmail.com', '$2b$10$mock_hash', 'assets/person/2.jpeg', 'assets/post/2.jpeg'),
(3, 'Alex Durden', 'alex@gmail.com', '$2b$10$mock_hash', 'assets/person/3.jpeg', 'assets/post/3.jpeg')
ON DUPLICATE KEY UPDATE id=id;

-- Insert mock posts
INSERT INTO posts (id, user_id, `desc`, photo, location, feeling)
VALUES 
(1, 1, 'Love For All, Hatred For None.', 'assets/post/1.jpeg', NULL, NULL),
(2, 999, 'My new profile is up and running!', 'assets/post/profile_banner.png', 'Palghar', '😊 Happy')
ON DUPLICATE KEY UPDATE id=id;
