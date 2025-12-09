import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <Link to={`/products/${product.id}`}>
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </Link>
      </div>

      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-short">{product.shortDescription}</p>

        <div className="product-meta">
          <div className="product-price">${product.price}</div>
          <div className="product-rating">{product.rating} ★</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
