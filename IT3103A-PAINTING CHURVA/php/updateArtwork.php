<?php
header('Content-Type: application/json; charset=UTF-8');
require 'config.php';

// 1) Collect POST fields:
$in = $_POST;

// 2) Handle optional new upload or fall back
$targetDir = __DIR__.'/../images/artworks/';
if (isset($_FILES['image_file']) && $_FILES['image_file']['error']===UPLOAD_ERR_OK) {
  if (!is_dir($targetDir)) mkdir($targetDir,0755,true);
  $name = uniqid().'_'.basename($_FILES['image_file']['name']);
  move_uploaded_file($_FILES['image_file']['tmp_name'], $targetDir.$name);
  $in['image_path'] = '/it3103a-todo/it3103a-todo/IT3103A-PAINTING CHURVA/images/artworks/'.$name;
} else {
  // use the old path from the hidden form field
  $in['image_path'] = $in['existing_image_path'];
}

// 3) Build and execute the UPDATE
$sql = "
  UPDATE artworks SET
    artist_id=?, artist=?, title=?, description=?, price=?,
    image_path=?, year_created=?, subject=?, size_dimensions=?,
    medium=?, frame=?, authenticity=?, packaging=?, ready_to_hang=?, category=?
  WHERE artwork_id=?
";

$nameStmt = $pdo->prepare("SELECT artist_name FROM artists WHERE artist_id=?");
$nameStmt->execute([ $in['artist_id'] ]);
$artistName = $nameStmt->fetchColumn();

$stmt = $pdo->prepare($sql);
try {
  $stmt->execute([
    $in['artist_id'], $artistName, $in['title'], $in['description'], $in['price'],
    $in['image_path'], $in['year_created'] ?: null, $in['subject'], $in['size_dimensions'],
    $in['medium'], $in['frame'], $in['authenticity'], $in['packaging'],
    $in['ready_to_hang'], $in['category'], $in['artwork_id']
  ]);
  echo json_encode(['success'=>true]);
} catch (Exception $e) {
  echo json_encode(['success'=>false,'message'=>$e->getMessage()]);
}
