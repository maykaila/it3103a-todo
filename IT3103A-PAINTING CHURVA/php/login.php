<?php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $password = $_POST['password'];

    if (!$email) {
        die('Invalid email address.');
    }

    $stmt = $pdo->prepare('SELECT user_id, firstname, password FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['user_name'] = $user['firstname'];
        header('Location: ../homepage.html'); // Adjust as needed
        exit;
    } else {
        die('Incorrect email or password.');
    }
}
?>
