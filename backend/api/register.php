<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../app/config/Database.php";
require_once "../app/models/User.php";

$db = (new Database())->connect();
$user = new User($db);

$data = json_decode(file_get_contents("php://input"), true);

$role = isset($data['role']) ? $data['role'] : 'user';

$result = $user->register($data['name'], $data['email'], $data['password'], $role);

if ($result) {
    // Get the newly created user data
    $stmt = $db->prepare("SELECT id, name, email, role FROM users WHERE email = :email");
    $stmt->execute([":email" => $data['email']]);
    $userData = $stmt->fetch(PDO::FETCH_ASSOC);

    $_SESSION['user_id'] = $userData['id'];
    $_SESSION['user_name'] = $userData['name'];
    $_SESSION['user_email'] = $userData['email'];
    $_SESSION['role'] = $userData['role'];

    echo json_encode([
        "success" => true,
        "user" => $userData
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Registration failed"
    ]);
}
