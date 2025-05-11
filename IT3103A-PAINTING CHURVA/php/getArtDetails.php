<?php
// php/getArtDetails.php
header('Content-Type: application/json; charset=UTF-8');
require __DIR__ . '/config.php';

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
  http_response_code(400);
  echo json_encode(['error'=>'Invalid ID']);
  exit;
}

$id = (int)$_GET['id'];
$stmt = $pdo->prepare("
  SELECT
    a.*,
    ar.artist_name,
    ar.artist_description,
    ar.profile_picture
  FROM artworks a
  JOIN artists  ar ON a.artist_id = ar.artist_id
  WHERE a.artwork_id = ?
");

$stmt->execute([$id]);
$art = $stmt->fetch();

if (!$art) {
  http_response_code(404);
  echo json_encode(['error'=>'Not found']);
  exit;
}

echo json_encode($art);
