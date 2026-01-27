import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.js";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/my-make-up-brand/backend/api/prodcts.php")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  const featured = products.slice(0, 3);

  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">NEW · WINTER COLLECTION 2025</p>
          <h1 className="hero-title">
            Glow all day,
            <br />
            shine all night.
          </h1>
          <p className="hero-text">
            Discover high-performance makeup that feels like skincare.
            Lightweight formulas, rich pigments, and a glow that lasts.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Shop now
            </Link>
            <Link to="/about" className="btn btn-ghost">
              Learn more
            </Link>
          </div>
        </div>

        <div className="hero-image-block">
          <div className="hero-image-overlay" />
          <p className="hero-badge">
            Up to <span>30% off</span> on bundles
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Featured products</h2>
          <Link to="/products" className="section-link">
            View all →
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;