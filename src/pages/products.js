import { useState } from "react";
import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.js";

function Products() {
  const [category, setCategory] = useState("All");

  const categories = ["All", "Face", "Eyes", "Lips", "Cheeks"];

  const filtered =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

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