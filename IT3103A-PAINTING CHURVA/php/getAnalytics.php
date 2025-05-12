<?php
// returns {"byCategory":{labels:[],values:[]}, "trends":{labels:[],values:[]}}
require 'config.php';
$data = [];

// by category
$stmt = $pdo->query("
  SELECT category, SUM(price) AS total
  FROM orders o
  JOIN artworks a ON o.artwork_id=a.artwork_id
  WHERE o.order_status='completed'
  GROUP BY a.category
");
$bc = ['labels'=>[], 'values'=>[]];
while($r=$stmt->fetch()) {
  $bc['labels'][] = $r['category'];
  $bc['values'][] = (float)$r['total'];
}

// monthly trends
$stmt = $pdo->query("
  SELECT DATE_FORMAT(o.date_of_order,'%b') AS mon, SUM(a.price) AS total
  FROM orders o
  JOIN artworks a ON o.artwork_id=a.artwork_id
  WHERE o.order_status='completed' 
  GROUP BY mon
  ORDER BY MONTH(o.date_of_order)
");
$tr = ['labels'=>[], 'values'=>[]];
while($r=$stmt->fetch()) {
  $tr['labels'][] = $r['mon'];
  $tr['values'][] = (float)$r['total'];
}

echo json_encode(['byCategory'=>$bc,'trends'=>$tr]);
