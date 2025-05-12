<?php
header('Content-Type: application/json; charset=UTF-8');
require 'config.php';

// 1) Handle the uploaded file
$targetDir = __DIR__ . '/../images/artworks/';
if (!is_dir($targetDir)) mkdir($targetDir, 0755, true);

if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
    $tmp  = $_FILES['image_file']['tmp_name'];
    $name = uniqid() . '_' . basename($_FILES['image_file']['name']);
    move_uploaded_file($tmp, $targetDir . $name);
    // relative path stored in DB
    $in['image_path'] = '/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/images/artworks/' . $name;
} else {
    echo json_encode(['success'=>false,'message'=>'Image upload failed']);
    exit;
}

// 2) Gather the rest of the POSTed fields
$in = $_POST; // FormData fields without files

// 3) Insert into DB (include all your columns)
$sql = "
  INSERT INTO artworks
    (artist_id, title, description, price,
     image_path, year_created, subject,
     size_dimensions, medium, frame,
     authenticity, packaging, ready_to_hang, category)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
";
$stmt = $pdo->prepare($sql);

try {
  $stmt->execute([
    $in['artist_id'],
    $in['title'],
    $in['description'],
    $in['price'],
    $in['image_path'],
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
