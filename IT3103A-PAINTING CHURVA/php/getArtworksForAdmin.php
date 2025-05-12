<?php
require 'config.php';
$stmt = $pdo->query("
  SELECT artwork_id, title, artist, price, category, image_path
  FROM artworks
  ORDER BY artwork_id DESC
");
echo json_encode($stmt->fetchAll());
