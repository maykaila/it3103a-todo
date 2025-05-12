<?php
session_start();
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
  exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['status' => 'error', 'message' => 'User not authenticated.']);
  exit;
}

require __DIR__ . '/config.php';

$requiredFields = ['fullName', 'address', 'cardNumber', 'cardExpiryMonth', 'cardExpiryYear', 'cardCVC', 'cartItems'];
foreach ($requiredFields as $field) {
  if (empty($data[$field])) {
    echo json_encode(['status' => 'error', 'message' => "Missing field: $field"]);
    exit;
  }
}

$userID = $_SESSION['user_id'];
$pdo->beginTransaction();

try {
  foreach ($data['cartItems'] as $item) {
    // Update the order status
    $stmt = $pdo->prepare("UPDATE orders SET order_status = 'completed' WHERE user_id = ? AND artwork_id = ? AND order_status = 'pending'");
    $stmt->execute([$userID, $item['artwork_id']]);

    // Fetch the order_id after update
    $stmt = $pdo->prepare("SELECT order_id FROM orders WHERE user_id = ? AND artwork_id = ? AND order_status = 'completed' LIMIT 1");
    $stmt->execute([$userID, $item['artwork_id']]);
    $order = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$order) {
      throw new Exception("Order not found after update.");
    }

    // Insert payment record
    $stmt = $pdo->prepare("INSERT INTO payment (order_id, payment_status, date_of_payment, card_number, card_expiry_month, card_expiry_year, card_cvc, shipping_address) VALUES (?, 'completed', NOW(), ?, ?, ?, ?, ?)");
    $stmt->execute([
      $order['order_id'],
      $data['cardNumber'],
      $data['cardExpiryMonth'],
      $data['cardExpiryYear'],
      $data['cardCVC'],
      $data['address']
    ]);
  }

  $pdo->commit();
  echo json_encode(['status' => 'success', 'message' => 'Payment completed and orders updated.']);
} catch (Exception $e) {
  $pdo->rollBack();
  echo json_encode(['status' => 'error', 'message' => 'Transaction failed: ' . $e->getMessage()]);
}
?>
