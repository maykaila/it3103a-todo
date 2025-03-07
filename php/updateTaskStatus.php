<?php
header("Content-Type: application/json");
require_once 'config.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $taskId = $_POST['task_id'] ?? null;
    $status = $_POST['status'] ?? null;

    if ($taskId !== null && $status !== null) {
        $sql = "UPDATE notes SET status = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        
        if ($stmt->execute([$status, $taskId])) {
            echo json_encode(["status" => "success", "message" => "Task updated successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update task"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid input"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
