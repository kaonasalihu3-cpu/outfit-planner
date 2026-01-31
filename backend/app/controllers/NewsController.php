<?php
require_once "../models/News.php";

class NewsController {
    private $newsModel;

    public function __construct($db) {
        $this->newsModel = new News($db);
    }

    public function getAll() {
        return $this->newsModel->getAll();
    }

    public function getById($id) {
        return $this->newsModel->getById($id);
    }

    public function create($data) {
        // Validate required fields
        if (empty($data['title']) || empty($data['content'])) {
            return ['success' => false, 'message' => 'Title and content are required'];
        }

        return $this->newsModel->create($data);
    }

    public function update($id, $data) {
        // Validate required fields
        if (empty($data['title']) || empty($data['content'])) {
            return ['success' => false, 'message' => 'Title and content are required'];
        }

        return $this->newsModel->update($id, $data);
    }

    public function delete($id) {
        return $this->newsModel->delete($id);
    }
}
