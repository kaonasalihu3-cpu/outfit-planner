<?php
require_once "../models/Product.php";

class ProductController {
    private $productModel;

    public function __construct($db) {
        $this->productModel = new Product($db);
    }

    public function getAll() {
        return $this->productModel->getAll();
    }

    public function getById($id) {
        return $this->productModel->getById($id);
    }

    public function create($data) {
        // Validate required fields
        if (empty($data['name']) || empty($data['category']) || empty($data['brand']) || !isset($data['price'])) {
            return ['success' => false, 'message' => 'Required fields missing'];
        }

        // Validate price
        if (!is_numeric($data['price']) || $data['price'] < 0) {
            return ['success' => false, 'message' => 'Invalid price'];
        }

        return $this->productModel->create($data);
    }

    public function update($id, $data) {
        // Validate required fields
        if (empty($data['name']) || empty($data['category']) || empty($data['brand']) || !isset($data['price'])) {
            return ['success' => false, 'message' => 'Required fields missing'];
        }

        // Validate price
        if (!is_numeric($data['price']) || $data['price'] < 0) {
            return ['success' => false, 'message' => 'Invalid price'];
        }

        return $this->productModel->update($id, $data);
    }

    public function delete($id) {
        return $this->productModel->delete($id);
    }
}
