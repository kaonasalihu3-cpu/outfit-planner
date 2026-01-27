<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../app/config/Database.php";
require_once "../app/controllers/ContentController.php";

$db = (new Database())->connect();
$controller = new ContentController($db);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['page'])) {
            $result = $controller->getByPage($_GET['page']);
            echo json_encode($result);
        }
        break;

    case 'PUT':
        if (isset($_GET['page']) && isset($_GET['section'])) {
            $data = json_decode(file_get_contents("php://input"), true);
            $result = $controller->update($_GET['page'], $_GET['section'], $data);
            echo json_encode($result);
        }
        break;
}
