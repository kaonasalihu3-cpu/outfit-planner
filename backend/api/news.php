<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../app/config/db.php";

try {
    $stmt = $conn->query("SELECT * FROM news ORDER BY created_at DESC");
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($news);
} catch (Exception $e) {
    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
