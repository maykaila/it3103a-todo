<?php
session_start();
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email    = $_POST['email'];
  $password = $_POST['password'];

  $stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE email = ?");
  $stmt->execute([$email]);
  $user = $stmt->fetch();

  if ($user) {
    if (password_verify($password, $user['password'])) {
      $_SESSION['user_id'] = $user['id'];
      $_SESSION['username'] = $user['username'];
      echo json_encode(['status' => 'success', 'message' => 'Sign in successful.']);
    } else {
      echo json_encode(['status' => 'error', 'message' => 'Incorrect password.']);
    }
  } else {
    echo json_encode(['status' => 'error', 'message' => 'No user found with that email.']);
  }
} else {
  echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
