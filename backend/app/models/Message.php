<?php
class Message {
    private $conn;
    private $table = "messages";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table}");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $query = "INSERT INTO {$this->table} (name, email, message) VALUES (:name, :email, :message)";
        $stmt = $this->conn->prepare($query);
        $result = $stmt->execute([
            ":name" => $data['name'],
            ":email" => $data['email'],
            ":message" => $data['message']
        ]);
        return $result ? ['success' => true, 'id' => $this->conn->lastInsertId()] : ['success' => false];
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM {$this->table} WHERE id = :id");
        $result = $stmt->execute([':id' => $id]);
        return $result ? ['success' => true] : ['success' => false];
    }
}
