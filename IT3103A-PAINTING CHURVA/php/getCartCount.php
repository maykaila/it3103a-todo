<?php
// php/getCartCount.php
session_start();
header('Content-Type: application/json; charset=UTF-8');

if (!isset($_SESSION['user_id'])) {
  // no session → zero items
  echo json_encode(['count' => 0]);
  exit;
}

require __DIR__ . '/config.php';
$stmt = $pdo->prepare("
  SELECT COUNT(*) AS cnt
  FROM orders
  WHERE user_id = ?
    AND order_status = 'pending'
");
$stmt->execute([ $_SESSION['user_id'] ]);
$row = $stmt->fetch();

echo json_encode(['count' => (int)$row['cnt']]);
