<?php
header('Content-Type: application/json; charset=UTF-8');
require 'config.php';
if (!isset($_GET['id'])) { http_response_code(400); exit; }
$id = (int)$_GET['id'];

$stmt = $pdo->prepare("
  SELECT a.*, ar.artist_name
  FROM artworks a
  JOIN artists ar ON a.artist_id=ar.artist_id
  WHERE a.artwork_id=?
");
$stmt->execute([$id]);
$art = $stmt->fetch();
echo json_encode($art ?: []);
