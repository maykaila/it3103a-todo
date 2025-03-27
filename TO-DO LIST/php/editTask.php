<?php
require_once 'config.php';
session_start(); // Start session to track user

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'User not logged in.']);
        exit;
    }

    $user_id   = $_SESSION['user_id'];
    $task_id   = isset($_POST['task_id']) ? $_POST['task_id'] : null;
    $title     = isset($_POST['title']) ? trim($_POST['title']) : '';
    $details   = isset($_POST['details']) ? trim($_POST['details']) : '';
    $note_date = isset($_POST['note_date']) && !empty($_POST['note_date']) ? $_POST['note_date'] : date('Y-m-d'); 
    $note_time = isset($_POST['note_time']) && !empty($_POST['note_time']) ? $_POST['note_time'] : date('H:i:s');

    if (!empty($title) && !empty($task_id)) {
        $sql = "UPDATE notes SET title = ?, details = ?, note_date = ?, note_time = ? WHERE id = ? AND user_id = ?";
        $stmt = $pdo->prepare($sql);
        if ($stmt->execute([$title, $details, $note_date, $note_time, $task_id, $user_id])) {
            echo json_encode(['status' => 'success', 'message' => 'Task updated successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update task.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Title and task ID are required.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
