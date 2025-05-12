<?php
header('Content-Type: application/json');
require 'config.php';
if (!isset($_GET['id'])) { http_response_code(400); echo json_encode(['success'=>false]); exit; }
$stmt = $pdo->prepare("DELETE FROM artworks WHERE artwork_id=?");
echo json_encode(['success'=>$stmt->execute([ (int)$_GET['id'] ])]);
