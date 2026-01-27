<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../app/config/Database.php";
require_once "../app/controllers/NewsController.php";

$db = (new Database())->connect();
$controller = new NewsController($db);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $result = $controller->getById($_GET['id']);
        } else {
            $result = $controller->getAll();
        }
        echo json_encode($result);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $controller->create($data);
        echo json_encode($result);
        break;

    case 'PUT':
        if (isset($_GET['id'])) {
            $data = json_decode(file_get_contents("php://input"), true);
            $result = $controller->update($_GET['id'], $data);
            echo json_encode($result);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $result = $controller->delete($_GET['id']);
            echo json_encode($result);
        }
        break;
}
