<?php
header('Content-Type: application/json; charset=UTF-8');
require 'config.php';

// 0) Gather textual inputs first
$in = $_POST;  // now $in contains title, description, etc.

// 1) Handle the uploaded file
$targetDir = __DIR__ . '/../images/artworks/';
if (!is_dir($targetDir)) mkdir($targetDir, 0755, true);

if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
    $tmp  = $_FILES['image_file']['tmp_name'];
    $name = uniqid() . '_' . basename($_FILES['image_file']['name']);
    if (! move_uploaded_file($tmp, $targetDir . $name)) {
      echo json_encode(['success'=>false,'message'=>'Could not move uploaded file']);
      exit;
    }
    // store the public‐URL path in your $in array
    $in['image_path'] = '/it3103a-todo/it3103a-todo/IT3103A-PAINTING CHURVA/images/artworks/' . $name;
} else {
    echo json_encode(['success'=>false,'message'=>'Image upload failed']);
    exit;
}

// 2) Now insert using $in['image_path'] plus the other $in fields
$sql = "
  INSERT INTO artworks
    (artist_id, artist, title, description, price,
     image_path, year_created, subject,
     size_dimensions, medium, frame,
     authenticity, packaging, ready_to_hang, category)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
";

$nameStmt = $pdo->prepare("SELECT artist_name FROM artists WHERE artist_id = ?");
$nameStmt->execute([ $in['artist_id'] ]);
$artistName = $nameStmt->fetchColumn();

$stmt = $pdo->prepare($sql);

try {
  $stmt->execute([
    $in['artist_id'],
    $artistName,
    $in['title'],
    $in['description'],
    $in['price'],
    $in['image_path'],         // now defined!
    $in['year_created'] ?: null,
    $in['subject'],
    $in['size_dimensions'],
    $in['medium'],
    $in['frame'],
    $in['authenticity'],
    $in['packaging'],
    $in['ready_to_hang'],
    $in['category']
  ]);
  echo json_encode(['success'=>true]);
} catch (Exception $e) {
  echo json_encode(['success'=>false,'message'=>$e->getMessage()]);
}
