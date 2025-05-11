<?php

session_start();
header('Content-Type: application/json; charset=UTF-8');

if (!isset($_SESSION['user_id'])) {
  // not logged in → empty cart
  echo json_encode(['items'=>[], 'total'=>0]);
  exit;
}

require __DIR__ . '/config.php';

// Fetch each pending order with its artwork details
$stmt = $pdo->prepare("
  SELECT o.order_id, a.artwork_id, a.title, a.price, a.image_path, ar.artist_name, a.category
  FROM orders o
  JOIN artworks a  ON o.artwork_id = a.artwork_id
  JOIN artists  ar ON a.artist_id   = ar.artist_id
  WHERE o.user_id = ? AND o.order_status = 'pending'
");
$stmt->execute([ $_SESSION['user_id'] ]);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

$total = array_reduce($items, fn($sum, $it) => $sum + (float)$it['price'], 0);

echo json_encode([
  'items' => $items,
  'total' => $total
]);
