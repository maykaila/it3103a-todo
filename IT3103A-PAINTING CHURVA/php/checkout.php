<?php
require_once('../stripe/stripe-php/init.php');
$dotenv = parse_ini_file('../.env');
$secretKey = $dotenv['STRIPE_SECRET_KEY'];
\Stripe\Stripe::setApiKey($secretKey); // Replace with your secret key

include('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = htmlspecialchars($_POST['fullName']);
    $address = htmlspecialchars($_POST['address']);
    $stripeToken = $_POST['stripeToken'];
    $userID = filter_var($_POST['userID'], FILTER_VALIDATE_INT);
    $artworkID = filter_var($_POST['artworkID'], FILTER_VALIDATE_INT);

    if (!$userID || !$artworkID) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid user or artwork ID.']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT price FROM artworks WHERE artwork_id = ?");
    $stmt->execute([$artworkID]);
    $artwork = $stmt->fetch();

    if (!$artwork) {
        echo json_encode(['status' => 'error', 'message' => 'Artwork not found.']);
        exit;
    }

    $amount = $artwork['price'] * 100;

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("INSERT INTO orders (artwork_id, user_id, order_status) VALUES (?, ?, 'pending')");
        $stmt->execute([$artworkID, $userID]);
        $orderID = $pdo->lastInsertId();

        $charge = \Stripe\Charge::create([
            'amount' => $amount,
            'currency' => 'php',
            'description' => 'Purchase of artwork',
            'source' => $stripeToken,
        ]);

        $status = ($charge->status === 'succeeded') ? 'completed' : 'failed';

        $stmt = $pdo->prepare("INSERT INTO payment (order_id, payment_status) VALUES (?, ?)");
        $stmt->execute([$orderID, $status]);

        $stmt = $pdo->prepare("UPDATE orders SET order_status = ? WHERE order_id = ?");
        $stmt->execute([$status, $orderID]);

        $pdo->commit();

        echo json_encode([
            'status' => $status === 'completed' ? 'success' : 'failed',
            'message' => $status === 'completed' ? 'Payment Successful!' : 'Payment failed.',
            'orderID' => $orderID,
            'chargeID' => $charge->id
        ]);
    } catch (Exception $e) {
        $pdo->rollBack();
        error_log('Stripe Error: ' . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Server error. Please try again.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
