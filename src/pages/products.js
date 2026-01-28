import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.js";

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["All", "Face", "Eyes", "Lips", "Cheeks"];

  useEffect(() => {
    fetch("http://localhost/my-make-up-brand/backend/api/products.php")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const filtered =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  if (loading) return <div className="page"><p>Loading products...</p></div>;
  if (error) return <div className="page"><p>{error}</p></div>;

  return (
    <div className="page products-page">
      <section className="section">
        <div className="section-header">
          <h1>All products</h1>
          <p>Find your perfect match by category.</p>
        </div>

        <div className="filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-chip ${
                c === category ? "filter-chip-active" : ""
              }`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {filtered.length === 0 && (
            <p className="empty-state">No products found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Products;

