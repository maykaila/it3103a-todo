<?php
session_start();

if (isset($_SESSION['username'])) {
    echo json_encode(["username" => $_SESSION['username']]);
} else {
    echo json_encode(["username" => "Guest"]); // Default username if not logged in
}
?>
