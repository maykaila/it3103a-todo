<?php
require_once 'config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in.']);
    exit;
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT id, title, details, DATE_FORMAT(note_date, '%Y-%m-%d') as note_date, TIME_FORMAT(note_time, '%H:%i') as note_time FROM notes WHERE user_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$user_id]);
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['status' => 'success', 'tasks' => $tasks]);
?>
