import "./css/productdetails.css";

function InfoItem({ name, value }) {
  return (
    <div className="info-item">
      <span className="info-label">{name}</span>
      <span className="info-value">{value}</span>
    </div>
  );
}

function Card({ review }) {
  return (
    <div className="review-card">
      <div className="review-user">
        <div className="review-avatar">
          {review.reviewerName?.charAt(0)?.toUpperCase()}
        </div>

        <div>
          <p className="review-name">{review.reviewerName}</p>
          <p className="review-email">{review.reviewerEmail}</p>
        </div>
      </div>

      <div className="review-rating">
        <span>Rating</span>

        <div className="stars">
          {Array.from(
            { length: review.rating },
            (_, index) => index + 1
          ).map((star) => (
            <span key={star}>★</span>
          ))}
        </div>
      </div>

      <p className="review-comment">
        "{review.comment}"
      </p>
    </div>
  );
}

export default function Productdetails({ product, onback }) {
  const discountrate =
    product.price -
    Math.floor((product.price * product.discountPercentage) / 100);

  return (
    <div className="product-page">

      {/* Back button */}
      <div className="product-container">
        <button className="back-button" onClick={onback}>
          <span>←</span>
          Back to Products
        </button>
      </div>

      {/* Product Hero */}
      <section className="product-container product-hero">

        <div className="product-image-section">
          <div className="image-glow"></div>

          <div className="product-image-card">
            <img
              src={product.images[0]}
              alt={product.title}
              loading="lazy"
            />
          </div>
        </div>

        <div className="product-summary">

          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <p className="product-description">
            {product.description}
          </p>

          <div className="price-section">
            <div>
              <span className="price-label">Current price</span>
              <div className="current-price">
                ${discountrate}
              </div>
            </div>

            <div className="original-price">
              ${product.price}
            </div>

            <div className="discount-badge">
              {product.discountPercentage}% OFF
            </div>
          </div>

          <div className="quick-stats">

            <div className="quick-stat">
              <span className="stat-icon">★</span>
              <div>
                <strong>{product.rating}</strong>
                <small>Rating</small>
              </div>
            </div>

            <div className="quick-stat">
              <span className="stat-icon">◉</span>
              <div>
                <strong>{product.stock}</strong>
                <small>In stock</small>
              </div>
            </div>

            <div className="quick-stat">
              <span className="stat-icon">✓</span>
              <div>
                <strong>Secure</strong>
                <small>Purchase</small>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Product Information */}
      <section className="product-container information-section">

        <div className="section-heading">
          <span className="section-number">01</span>

          <div>
            <p>PRODUCT INFORMATION</p>
            <h2>Everything you need to know</h2>
          </div>
        </div>

        <div className="details-grid">

          <div className="details-card">
            <h3>Product Details</h3>

            <InfoItem
              name="Category"
              value={product.category}
            />

            <InfoItem
              name="Brand"
              value={product.brand}
            />

            <InfoItem
              name="SKU"
              value={product.sku}
            />

            <InfoItem
              name="Weight"
              value={`${product.weight} kgs`}
            />

            <InfoItem
              name="Minimum Order"
              value={product.minimumOrderQuantity}
            />

            <InfoItem
              name="Stock"
              value={product.stock}
            />
          </div>

          <div className="details-card">
            <h3>Shipping & Warranty</h3>

            <InfoItem
              name="Warranty"
              value={product.warrantyInformation}
            />

            <InfoItem
              name="Shipping"
              value={product.shippingInformation}
            />

            <InfoItem
              name="Dimensions"
              value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`}
            />

            <InfoItem
              name="Tags"
              value={product.tags.join(", ")}
            />

            <InfoItem
              name="Discount"
              value={`${product.discountPercentage}%`}
            />

            <InfoItem
              name="Final Price"
              value={`$${discountrate}`}
            />
          </div>

        </div>
      </section>

      {/* Reviews */}
      <section className="product-container reviews-section">

        <div className="section-heading">
          <span className="section-number">02</span>

          <div>
            <p>CUSTOMER FEEDBACK</p>
            <h2>What customers are saying</h2>
          </div>
        </div>

        <div className="reviews-grid">
          {product.reviews.map((review, index) => (
            <Card
              key={index}
              review={review}
            />
          ))}
        </div>

      </section>

    </div>
  );
}