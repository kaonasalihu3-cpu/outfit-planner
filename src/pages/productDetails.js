import { useParams, Link } from "react-router-dom";
import { products } from "../data/products.js";

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="page">
        <section className="section">
          <p>Product not found.</p>
          <Link to="/products" className="btn btn-outline">
            Back to products
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page product-details-page">
      <section className="section product-details">
        <div className="product-details-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-details-image"
          />
        </div>

        <div className="product-details-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-brand-large">{product.brand}</p>

          <div className="product-details-meta">
            <span className="product-price-large">€{product.price}</span>
            <span className="product-rating-large">★ {product.rating}</span>
            <span className="product-shades">
              {product.shades} shades available
            </span>
          </div>

          <p className="product-description">{product.description}</p>

          <button className="btn btn-primary">Add to bag</button>

          <Link to="/products" className="back-link">
            ← Back to all products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;