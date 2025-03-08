<?php
require_once 'config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in.']);
    exit;
}

$user_id = $_SESSION['user_id'];

// Update tasks that are overdue to 'missed'
$sqlUpdate = "UPDATE notes 
              SET status = 'missed' 
              WHERE user_id = ? 
                AND status = 'on-going' 
                AND CONCAT(note_date, ' ', note_time) < NOW()";
$stmt = $pdo->prepare($sqlUpdate);
$stmt->execute([$user_id]);

// Now fetch all tasks (which now include updated statuses)
$sql = "SELECT id, title, details, DATE_FORMAT(note_date, '%Y-%m-%d') as note_date, 
               TIME_FORMAT(note_time, '%H:%i') as note_time, status 
        FROM notes 
        WHERE user_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$user_id]);
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['status' => 'success', 'tasks' => $tasks]);
?>
