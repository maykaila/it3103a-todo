<?php
header('Content-Type: application/json; charset=UTF-8');
require 'config.php';

$targetDir = __DIR__ . '/../images/profiles/';
if (!is_dir($targetDir)) mkdir($targetDir, 0755, true);

$profilePath = null;
if (!empty($_FILES['profile_file']) && $_FILES['profile_file']['error'] === UPLOAD_ERR_OK) {
    $tmp  = $_FILES['profile_file']['tmp_name'];
    $name = uniqid() . '_' . basename($_FILES['profile_file']['name']);
    move_uploaded_file($tmp, $targetDir . $name);
    $profilePath = '/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/images/profiles/' . $name;
}

// Collect textual fields
$in = $_POST;

$sql = "INSERT INTO artists
  (artist_name, artist_description, profile_picture)
  VALUES (?,?,?)";
$stmt = $pdo->prepare($sql);

try {
  $stmt->execute([
    $in['artist_name'],
    $in['artist_description'],
    $profilePath
  ]);
  echo json_encode(['success'=>true]);
} catch(Exception $e){
  echo json_encode(['success'=>false,'message'=>$e->getMessage()]);
}
