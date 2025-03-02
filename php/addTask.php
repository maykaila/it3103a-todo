<?php
// addTask.php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data from the AJAX request
    $user_id   = 1; // Replace with your logged in user's ID
    $title     = isset($_POST['title']) ? trim($_POST['title']) : '';
    $details   = isset($_POST['details']) ? trim($_POST['details']) : '';
    $note_date = isset($_POST['note_date']) ? $_POST['note_date'] : date('Y-m-d');
    $note_time = isset($_POST['note_time']) ? $_POST['note_time'] : date('H:i:s');

    if (!empty($title)) {
        // Prepare and execute the SQL statement
        $sql = "INSERT INTO notes (user_id, note_date, note_time, title, details) VALUES (?, ?, ?, ?, ?)";
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
