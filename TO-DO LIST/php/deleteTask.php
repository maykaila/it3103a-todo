<?php
require_once 'config.php';
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'User not logged in.']);
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $task_id = isset($_POST['task_id']) ? $_POST['task_id'] : null;

    if (!empty($task_id)) {
        $sql = "DELETE FROM notes WHERE id = ? AND user_id = ?";
        $stmt = $pdo->prepare($sql);
        if ($stmt->execute([$task_id, $user_id])) {
            echo json_encode(['status' => 'success', 'message' => 'Task deleted successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete task.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Task ID is required.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
