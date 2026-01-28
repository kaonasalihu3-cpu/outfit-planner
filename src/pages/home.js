import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.js";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for testing
  const mockProducts = [
    {
      id: 1,
      name: "Radiant Foundation",
      category: "Face",
      brand: "Glow Beauty",
      price: 45.00,
      rating: 4.5,
      shades: 12,
      shortDescription: "A lightweight foundation that provides natural coverage with a radiant finish.",
      image: "/images/foundation.jpg"
    },
    {
      id: 2,
      name: "Velvet Lipstick",
      category: "Lips",
      brand: "Lux Lips",
      price: 25.00,
      rating: 4.8,
      shades: 8,
      shortDescription: "Creamy lipstick with long-lasting color and moisturizing formula.",
      image: "/images/lipstick.jpg"
    },
    {
      id: 3,
      name: "Smoky Eye Palette",
      category: "Eyes",
      brand: "Eye Glam",
      price: 35.00,
      rating: 4.7,
      shades: 15,
      shortDescription: "Professional eyeshadow palette perfect for creating smoky eye looks.",
      image: "/images/eyeshadow.jpg"
    },
    {
      id: 4,
      name: "Blush Duo",
      category: "Cheeks",
      brand: "Cheek Chic",
      price: 30.00,
      rating: 4.6,
      shades: 2,
      shortDescription: "Two complementary blush shades for natural-looking flushed cheeks.",
      image: "/images/blush.jpg"
    },
    {
      id: 5,
      name: "Highlighter Stick",
      category: "Face",
      brand: "Glow Beauty",
      price: 28.00,
      rating: 4.9,
      shades: 1,
      shortDescription: "Buildable highlighter that adds a luminous glow to any skin tone.",
      image: "/images/highlighter.jpg"
    },
    {
      id: 6,
      name: "Mascara Volume",
      category: "Eyes",
      brand: "Lash Luxe",
      price: 22.00,
      rating: 4.4,
      shades: 1,
      shortDescription: "Volumizing mascara that lengthens and defines lashes.",
      image: "/images/mascara.jpg"
    }
  ];

  useEffect(() => {
    fetch("http://localhost/my-make-up-brand/backend/api/products.php")
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