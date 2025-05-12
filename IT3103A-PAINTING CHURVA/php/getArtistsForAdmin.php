<?php
require 'config.php';
$stmt = $pdo->query("
  SELECT artist_id, artist_name
  FROM artists
  ORDER BY artist_name
");
echo json_encode($stmt->fetchAll());
