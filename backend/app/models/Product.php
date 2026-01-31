<?php
class Product {
    private $conn;
    private $table = "products";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table}");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $query = "INSERT INTO {$this->table}
                  (name, category, brand, price, rating, shades, description, image)
                  VALUES (:name, :category, :brand, :price, :rating, :shades, :description, :image)";

        $stmt = $this->conn->prepare($query);
        $result = $stmt->execute([
            ":name" => $data['name'],
            ":category" => $data['category'],
            ":brand" => $data['brand'],
            ":price" => $data['price'],
            ":rating" => $data['rating'] ?? 0.00,
            ":shades" => $data['shades'] ?? 1,
            ":description" => $data['description'] ?? '',
            ":image" => $data['image'] ?? ''
        ]);

        return $result ? ['success' => true, 'id' => $this->conn->lastInsertId()] : ['success' => false];
    }

    public function update($id, $data) {
        $query = "UPDATE {$this->table} SET
                  name = :name, category = :category, brand = :brand, price = :price,
                  rating = :rating, shades = :shades, description = :description, image = :image
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $result = $stmt->execute([
            ":id" => $id,
            ":name" => $data['name'],
            ":category" => $data['category'],
            ":brand" => $data['brand'],
            ":price" => $data['price'],
            ":rating" => $data['rating'] ?? 0.00,
            ":shades" => $data['shades'] ?? 1,
            ":description" => $data['description'] ?? '',
            ":image" => $data['image'] ?? ''
        ]);

        return $result ? ['success' => true] : ['success' => false];
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM {$this->table} WHERE id = :id");
        $result = $stmt->execute([':id' => $id]);
        return $result ? ['success' => true] : ['success' => false];
    }
}
<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../app/config/Database.php";
require_once "../app/models/Product.php";

$db = (new Database())->connect();
$product = new Product($db);

echo json_encode($product->getAll());
