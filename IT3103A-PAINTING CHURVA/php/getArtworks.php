<?php
// …/php/getArtworks.php

header('Content-Type: application/json; charset=UTF-8');

$cat = isset($_GET['category']) ? strtolower($_GET['category']) : '';
$sort = isset($_GET['sort']) ? $_GET['sort'] : '';
$minPrice = isset($_GET['min_price']) ? floatval($_GET['min_price']) : 0;
$maxPrice = isset($_GET['max_price']) ? floatval($_GET['max_price']) : PHP_FLOAT_MAX;

// Log the incoming parameters for debugging
error_log("Category: $cat, Min Price: $minPrice, Max Price: $maxPrice");

if (! in_array($cat, ['painting', 'drawing', 'print'], true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid category']);
    exit;
}

$mysqli = new mysqli('localhost', 'root', '', 'chromatica_db');
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed']);
    exit;
}

// Log successful DB connection
error_log("Database connection successful");

// Determine ORDER BY clause based on sort
switch ($sort) {
    case 'low':
        $orderClause = 'ORDER BY a.price ASC';
        break;
    case 'high':
        $orderClause = 'ORDER BY a.price DESC';
        break;
    default:
        $orderClause = 'ORDER BY a.artwork_id';
}

$sql = "
  SELECT 
    a.artwork_id,
    a.title,
    a.size_dimensions,
    a.price,
    a.image_path,
    ar.artist_name
  FROM artworks AS a
  JOIN artists AS ar ON a.artist_id = ar.artist_id
  WHERE a.category = ?
    AND a.price >= ?
    AND a.price <= ?
  $orderClause
";

// Log the SQL query
error_log("SQL Query: " . $sql);

$stmt = $mysqli->prepare($sql);
$stmt->bind_param('sdd', $cat, $minPrice, $maxPrice);
$stmt->execute();

if ($stmt->error) {
    http_response_code(500);
    echo json_encode(['error' => 'SQL error: ' . $stmt->error]);
    exit;
}

$res = $stmt->get_result();
$data = [];
while ($row = $res->fetch_assoc()) {
    $data[] = $row;
}

// Log the number of artworks found
error_log("Artworks found: " . count($data));

echo json_encode($data);
