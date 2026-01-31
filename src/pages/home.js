import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Slider from "../components/Slider";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/backend/api/products.php")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setLoading(false);
      });
  }, []);

  const featured = products.slice(0, 3);

  const sliderImages = [
    {
      url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200",
      title: "Winter Collection 2025",
      description: "Discover our latest winter makeup collection"
    },
    {
      url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200",
      title: "Glow Beauty Products",
      description: "High-performance makeup that feels like skincare"
    }
  ];

  if (loading) {
    return <p style={{ padding: 40 }}>Loading products...</p>;
  }

  return (
    <div className="page home-page">
      <Slider images={sliderImages} />

      <section className="section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <Link to="/products">View all →</Link>
      </section>
    </div>
  );
}

export default Home;
