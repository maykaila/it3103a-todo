<?php
header('Content-Type: application/json; charset=UTF-8');

$keyword = isset($_GET['keyword']) ? trim($_GET['keyword']) : '';
if ($keyword === '') {
    echo json_encode([]);
    exit;
}

$mysqli = new mysqli('localhost', 'root', '', 'chromatica_db');
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed']);
    exit;
}

$sql = "
    SELECT a.artwork_id, a.title, a.size_dimensions, a.price, a.image_path, ar.artist_name
    FROM artworks AS a
    JOIN artists AS ar ON a.artist_id = ar.artist_id
    WHERE a.title LIKE CONCAT('%', ?, '%')
       OR ar.artist_name LIKE CONCAT('%', ?, '%')
       OR a.category LIKE CONCAT('%', ?, '%')
    ORDER BY a.artwork_id
";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param('sss', $keyword, $keyword, $keyword);
$stmt->execute();
$res = $stmt->get_result();

$data = [];
while ($row = $res->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
