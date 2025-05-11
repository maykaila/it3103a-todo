<?php

session_start();
header('Content-Type: application/json; charset=UTF-8');

$input = json_decode(file_get_contents('php://input'), true);
if (empty($input['artwork_id'])) {
  http_response_code(400);
  echo json_encode(['success'=>false,'message'=>'No artwork specified']);
  exit;
}

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['success'=>false,'error'=>'not_logged_in']);
  exit;
}

require __DIR__ . '/config.php';
try {
  $stmt = $pdo->prepare(
    "INSERT INTO orders (artwork_id, user_id, order_status) VALUES (?, ?, 'pending')"
  );
  $stmt->execute([$input['artwork_id'], $_SESSION['user_id']]);
  echo json_encode(['success'=>true]);
} catch (\Exception $e) {
  echo json_encode(['success'=>false,'message'=>$e->getMessage()]);
}
