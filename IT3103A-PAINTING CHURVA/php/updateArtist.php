<?php
header('Content-Type: application/json; charset=UTF-8');
require 'config.php';

// 1) Collect text fields
$in = $_POST;

// 2) Handle optional new file upload
$targetDir = __DIR__ . '/../images/profiles/';
if (isset($_FILES['profile_file']) && $_FILES['profile_file']['error'] === UPLOAD_ERR_OK) {
  if (!is_dir($targetDir)) mkdir($targetDir, 0755, true);
  $name = uniqid() . '_' . basename($_FILES['profile_file']['name']);
  move_uploaded_file($_FILES['profile_file']['tmp_name'], $targetDir . $name);
  $in['profile_picture'] = '/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/images/profiles/' . $name;
} else {
  // no new upload → use the old path
  $in['profile_picture'] = $in['existing_profile_picture'];
}

// 3) Update SQL
$sql = "
  UPDATE artists SET
    artist_name=?, artist_description=?, profile_picture=?
  WHERE artist_id=?
";
$stmt = $pdo->prepare($sql);
try {
  $stmt->execute([
    $in['artist_name'], $in['artist_description'], $in['profile_picture'] ?? null,
    $in['artist_id']
  ]);
  echo json_encode(['success'=>true]);
} catch(Exception $e) {
  echo json_encode(['success'=>false,'message'=>$e->getMessage()]);
}
