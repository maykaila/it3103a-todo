<?php
header('Content-Type: application/json; charset=UTF-8');
require 'config.php';
if (!isset($_GET['id'])) { http_response_code(400); exit; }
$id = (int)$_GET['id'];
$stmt = $pdo->prepare("SELECT * FROM artists WHERE artist_id=?");
$stmt->execute([$id]);
echo json_encode($stmt->fetch() ?: []);
