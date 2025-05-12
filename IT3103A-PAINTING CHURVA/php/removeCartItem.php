<?php
require 'config.php'; // use config.php, same as getCartItems

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['cart_item_id'])) {
    $stmt = $pdo->prepare("DELETE FROM orders WHERE order_id = ?");
    if ($stmt->execute([$data['cart_item_id']])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
