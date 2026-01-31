<?php
require_once "../models/Message.php";

class MessageController {
    private $messageModel;

    public function __construct($db) {
        $this->messageModel = new Message($db);
    }

    public function getAll() {
        return $this->messageModel->getAll();
    }

    public function create($data) {
        // Validate required fields
        if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
            return ['success' => false, 'message' => 'All fields are required'];
        }

        // Validate email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'message' => 'Invalid email format'];
        }

        return $this->messageModel->create($data);
    }

    public function delete($id) {
        return $this->messageModel->delete($id);
    }
}
