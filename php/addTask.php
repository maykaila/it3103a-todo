<?php
require_once 'config.php';
session_start();  // Start session to get logged-in user

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if user is logged in
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'User not logged in.']);
        exit;
    }

    $user_id   = $_SESSION['user_id'];  // Get the logged-in user's ID
    $title     = isset($_POST['title']) ? trim($_POST['title']) : '';
    $details   = isset($_POST['details']) ? trim($_POST['details']) : '';
    $note_date = isset($_POST['note_date']) ? $_POST['note_date'] : date('Y-m-d');
    $note_time = isset($_POST['note_time']) ? $_POST['note_time'] : date('H:i:s');

    if (!empty($title)) {
        // Insert task with status field (default: 'on-going')
        $sql = "INSERT INTO notes (user_id, note_date, note_time, title, details, status) 
                VALUES (?, ?, ?, ?, ?, 'on-going')";
        $stmt = $pdo->prepare($sql);
        if ($stmt->execute([$user_id, $note_date, $note_time, $title, $details])) {
            echo json_encode(['status' => 'success', 'message' => 'Task added successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to add task.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Title is required.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
