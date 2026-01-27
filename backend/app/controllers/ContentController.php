<?php
require_once "../models/Content.php";

class ContentController {
    private $contentModel;

    public function __construct($db) {
        $this->contentModel = new Content($db);
    }

    public function getByPage($page) {
        return $this->contentModel->getByPage($page);
    }

    public function update($page, $section, $data) {
        // Validate required fields
        if (empty($data['title']) && empty($data['content'])) {
            return ['success' => false, 'message' => 'Title or content is required'];
        }

        return $this->contentModel->update($page, $section, $data);
    }
}
