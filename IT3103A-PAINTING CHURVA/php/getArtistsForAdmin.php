<?php
require 'config.php';
$stmt = $pdo->query("
  SELECT artist_id, artist_name, artist_description, profile_picture
  FROM artists
  ORDER BY artist_name
");
echo json_encode($stmt->fetchAll());
