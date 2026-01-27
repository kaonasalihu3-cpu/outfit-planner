<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../app/config/Database.php";
require_once "../app/models/User.php";

$db = (new Database())->connect();
$user = new User($db);

$data = json_decode(file_get_contents("php://input"), true);

$result = $user->login($data['email'], $data['password']);

if ($result) {
    $_SESSION['user_id'] = $result['id'];
    $_SESSION['user_name'] = $result['name'];
    $_SESSION['user_email'] = $result['email'];
    $_SESSION['role'] = $result['role'];

    echo json_encode([
        "success" => true,
        "user" => $result
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid credentials"
    ]);
}
