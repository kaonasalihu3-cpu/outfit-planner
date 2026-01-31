<?php
class User {
    private $conn;
    private $table = "users";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function register($name, $email, $password, $role = "user") {
        // Validate role
        if (!in_array($role, ['user', 'admin'])) {
            $role = 'user';
        }
        $query = "INSERT INTO {$this->table}
                  (name, email, password, role)
                  VALUES (:name, :email, :password, :role)";

        $stmt = $this->conn->prepare($query);
        $hashed = password_hash($password, PASSWORD_DEFAULT);

        return $stmt->execute([
            ":name" => $name,
            ":email" => $email,
            ":password" => $hashed,
            ":role" => $role
        ]);
    }

    public function login($email, $password) {
        $stmt = $this->conn->prepare(
            "SELECT * FROM {$this->table} WHERE email = :email"
        );
        $stmt->execute([":email" => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']);
            return $user;
        }
        return false;
    }
}
