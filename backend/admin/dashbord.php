<?php
session_start();
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    header("Location: ../api/login.php");
    exit;
}

require_once "../app/config/Database.php";
require_once "../app/controllers/ProductController.php";
require_once "../app/controllers/NewsController.php";
require_once "../app/controllers/MessageController.php";

$db = (new Database())->connect();
$productController = new ProductController($db);
$newsController = new NewsController($db);
$messageController = new MessageController($db);

$products = $productController->getAll();
$news = $newsController->getAll();
$messages = $messageController->getAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Makeup Brand</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .header { background: #333; color: white; padding: 20px; margin: -20px -20px 20px -20px; }
        .header h1 { margin: 0; }
        .logout-btn { background: #dc3545; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; }
        .section { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .section h2 { margin-top: 0; color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background: #f8f9fa; font-weight: bold; }
        .btn { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; margin: 2px; }
        .btn-edit { background: #ffc107; color: #000; }
        .btn-delete { background: #dc3545; color: white; }
        .btn-add { background: #28a745; color: white; }
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; }
        .modal-content { background: white; margin: 5% auto; padding: 20px; border-radius: 8px; width: 90%; max-width: 600px; }
        .form-group { margin: 15px 0; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input, .form-group textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        .form-group textarea { height: 100px; }
        .modal-actions { text-align: right; margin-top: 20px; }
        .empty-state { text-align: center; color: #666; font-style: italic; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Admin Dashboard</h1>
        <a href="../api/logout.php" class="logout-btn">Logout</a>
    </div>

    <div class="section">
        <h2>Products Management</h2>
        <button class="btn btn-add" onclick="showProductModal()">Add Product</button>
        <table id="products-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($products)): ?>
                    <tr><td colspan="7" class="empty-state">No products found</td></tr>
                <?php else: ?>
                    <?php foreach($products as $product): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($product['id']); ?></td>
                        <td><?php echo htmlspecialchars($product['name']); ?></td>
                        <td><?php echo htmlspecialchars($product['category']); ?></td>
                        <td><?php echo htmlspecialchars($product['brand']); ?></td>
                        <td>$<?php echo htmlspecialchars($product['price']); ?></td>
                        <td><?php echo htmlspecialchars($product['rating']); ?>★</td>
                        <td>
                            <button class="btn btn-edit" onclick="editProduct(<?php echo $product['id']; ?>)">Edit</button>
                            <button class="btn btn-delete" onclick="deleteProduct(<?php echo $product['id']; ?>)">Delete</button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>News Management</h2>
        <button class="btn btn-add" onclick="showNewsModal()">Add News</button>
        <table id="news-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($news)): ?>
                    <tr><td colspan="4" class="empty-state">No news found</td></tr>
                <?php else: ?>
                    <?php foreach($news as $item): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($item['id']); ?></td>
                        <td><?php echo htmlspecialchars($item['title']); ?></td>
                        <td><?php echo htmlspecialchars($item['created_at']); ?></td>
                        <td>
                            <button class="btn btn-edit" onclick="editNews(<?php echo $item['id']; ?>)">Edit</button>
                            <button class="btn btn-delete" onclick="deleteNews(<?php echo $item['id']; ?>)">Delete</button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Contact Messages</h2>
        <table id="messages-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($messages)): ?>
                    <tr><td colspan="6" class="empty-state">No messages found</td></tr>
                <?php else: ?>
                    <?php foreach($messages as $message): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($message['id']); ?></td>
                        <td><?php echo htmlspecialchars($message['name']); ?></td>
                        <td><?php echo htmlspecialchars($message['email']); ?></td>
                        <td><?php echo htmlspecialchars(substr($message['message'], 0, 50)) . (strlen($message['message']) > 50 ? '...' : ''); ?></td>
                        <td><?php echo htmlspecialchars($message['created_at']); ?></td>
                        <td>
                            <button class="btn btn-delete" onclick="deleteMessage(<?php echo $message['id']; ?>)">Delete</button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <!-- Product Modal -->
    <div id="product-modal" class="modal">
        <div class="modal-content">
            <h3 id="product-modal-title">Add Product</h3>
            <form id="product-form">
                <input type="hidden" id="product-id" name="id">
                <div class="form-group">
                    <label for="product-name">Name *</label>
                    <input type="text" id="product-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="product-category">Category *</label>
                    <input type="text" id="product-category" name="category" required>
                </div>
                <div class="form-group">
                    <label for="product-brand">Brand *</label>
                    <input type="text" id="product-brand" name="brand" required>
                </div>
                <div class="form-group">
                    <label for="product-price">Price *</label>
                    <input type="number" id="product-price" name="price" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="product-rating">Rating</label>
                    <input type="number" id="product-rating" name="rating" step="0.1" min="0" max="5">
                </div>
                <div class="form-group">
                    <label for="product-shades">Shades</label>
                    <input type="number" id="product-shades" name="shades" min="1">
                </div>
                <div class="form-group">
                    <label for="product-description">Description</label>
                    <textarea id="product-description" name="description"></textarea>
                </div>
                <div class="form-group">
                    <label for="product-image">Image URL</label>
                    <input type="url" id="product-image" name="image">
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-add">Save</button>
                </div>
            </form>
        </div>
    </div>

    <!-- News Modal -->
    <div id="news-modal" class="modal">
        <div class="modal-content">
            <h3 id="news-modal-title">Add News</h3>
            <form id="news-form">
                <input type="hidden" id="news-id" name="id">
                <div class="form-group">
                    <label for="news-title">Title *</label>
                    <input type="text" id="news-title" name="title" required>
                </div>
                <div class="form-group">
                    <label for="news-content">Content *</label>
                    <textarea id="news-content" name="content" required></textarea>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-add">Save</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        let currentProductId = null;
        let currentNewsId = null;

        // Product functions
        function showProductModal(productId = null) {
            currentProductId = productId;
            document.getElementById('product-modal-title').textContent = productId ? 'Edit Product' : 'Add Product';
            document.getElementById('product-form').reset();
            document.getElementById('product-id').value = '';

            if (productId) {
                // Load product data
                fetch(`../api/prodcts.php?id=${productId}`)
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById('product-id').value = data.id;
                        document.getElementById('product-name').value = data.name;
                        document.getElementById('product-category').value = data.category;
                        document.getElementById('product-brand').value = data.brand;
                        document.getElementById('product-price').value = data.price;
                        document.getElementById('product-rating').value = data.rating;
                        document.getElementById('product-shades').value = data.shades;
                        document.getElementById('product-description').value = data.description;
                        document.getElementById('product-image').value = data.image;
                    });
            }

            document.getElementById('product-modal').style.display = 'block';
        }

        function editProduct(id) {
            showProductModal(id);
        }

        function deleteProduct(id) {
            if (confirm('Are you sure you want to delete this product?')) {
                fetch(`../api/prodcts.php?id=${id}`, { method: 'DELETE' })
                    .then(() => location.reload());
            }
        }

        // News functions
        function showNewsModal(newsId = null) {
            currentNewsId = newsId;
            document.getElementById('news-modal-title').textContent = newsId ? 'Edit News' : 'Add News';
            document.getElementById('news-form').reset();
            document.getElementById('news-id').value = '';

            if (newsId) {
                // Load news data - you'll need to implement this endpoint
                fetch(`../api/news.php?id=${newsId}`)
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById('news-id').value = data.id;
                        document.getElementById('news-title').value = data.title;
                        document.getElementById('news-content').value = data.content;
                    });
            }

            document.getElementById('news-modal').style.display = 'block';
        }

        function editNews(id) {
            showNewsModal(id);
        }

        function deleteNews(id) {
            if (confirm('Are you sure you want to delete this news item?')) {
                fetch(`../api/news.php?id=${id}`, { method: 'DELETE' })
                    .then(() => location.reload());
            }
        }

        function deleteMessage(id) {
            if (confirm('Are you sure you want to delete this message?')) {
                fetch(`../api/contacts.php?id=${id}`, { method: 'DELETE' })
                    .then(() => location.reload());
            }
        }

        function closeModal() {
            document.getElementById('product-modal').style.display = 'none';
            document.getElementById('news-modal').style.display = 'none';
        }

        // Form submissions
        document.getElementById('product-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            const method = data.id ? 'PUT' : 'POST';
            const url = data.id ? `../api/prodcts.php?id=${data.id}` : '../api/prodcts.php';

            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(() => {
                closeModal();
                location.reload();
            });
        });

        document.getElementById('news-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            const method = data.id ? 'PUT' : 'POST';
            const url = data.id ? `../api/news.php?id=${data.id}` : '../api/news.php';

            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(() => {
                closeModal();
                location.reload();
            });
        });

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target.className === 'modal') {
                closeModal();
            }
        }
    </script>
</body>
</html>
