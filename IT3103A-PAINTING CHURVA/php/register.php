<?php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect and sanitize input
    $firstname = trim($_POST['firstname']);
    $lastname  = trim($_POST['lastname']);
    $email     = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $password  = $_POST['password'];

    if (!$email) {
        die('Invalid email address.');
    }
    if (strlen($password) < 6) {
        die('Password must be at least 6 characters long.');
    }

    // Check if email already exists
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        die('Email is already registered.');
    }

    // Hash password
    $hash = password_hash($password, PASSWORD_DEFAULT);

    // Insert new user
    $stmt = $pdo->prepare('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)');
    if ($stmt->execute([$firstname, $lastname, $email, $hash])) {
        $_SESSION['user_id'] = $pdo->lastInsertId();
        $_SESSION['user_name'] = $firstname;
        header('Location: homepage.html');
        exit;
    } else {
        die('Registration failed. Please try again.');
    }
}
?>