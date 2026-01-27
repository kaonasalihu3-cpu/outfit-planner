<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../app/config/Database.php";
require_once "../app/controllers/MessageController.php";

$db = (new Database())->connect();
$controller = new MessageController($db);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        echo json_encode($controller->getAll());
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($controller->create($data));
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            echo json_encode($controller->delete($_GET['id']));
        }
        break;
}
