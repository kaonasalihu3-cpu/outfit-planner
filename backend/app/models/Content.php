<?php
class Content {
    private $conn;
    private $table = "content";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getByPage($page) {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE page = :page");
        $stmt->execute([':page' => $page]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($page, $section, $data) {
        // Check if content exists
        $stmt = $this->conn->prepare("SELECT id FROM {$this->table} WHERE page = :page AND section = :section");
        $stmt->execute([':page' => $page, ':section' => $section]);
        $existing = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($existing) {
            // Update existing
            $stmt = $this->conn->prepare("UPDATE {$this->table} SET title = :title, content = :content, image = :image WHERE page = :page AND section = :section");
            $result = $stmt->execute([
                ':title' => $data['title'] ?? null,
                ':content' => $data['content'] ?? null,
                ':image' => $data['image'] ?? null,
                ':page' => $page,
                ':section' => $section
            ]);
        } else {
            // Insert new
            $stmt = $this->conn->prepare("INSERT INTO {$this->table} (page, section, title, content, image) VALUES (:page, :section, :title, :content, :image)");
            $result = $stmt->execute([
                ':page' => $page,
                ':section' => $section,
                ':title' => $data['title'] ?? null,
                ':content' => $data['content'] ?? null,
                ':image' => $data['image'] ?? null
            ]);
        }

        return $result ? ['success' => true] : ['success' => false];
    }
}
