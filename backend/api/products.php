<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../app/config/db.php";

try {
    $stmt = $conn->query("SELECT * FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($products);
} catch (Exception $e) {
    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
