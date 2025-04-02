<?php
session_start();
session_unset(); // Clear session variables
session_destroy(); // Destroy the session

header('Content-Type: application/json');
echo json_encode(['status' => 'success', 'message' => 'Logged out successfully']);
exit;
?>
