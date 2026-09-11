import { useEffect, useState } from "react";
import "./css/productdetails.css";
import { useSelector } from "react-redux";

function InfoItem({ name, value }) {
  return (
    <div className="info-item">
      <span className="info-label">{name}</span>
      <span className="info-value">{value}</span>
    </div>
  );
}

function Card({
  review,
  product,
  setIseditMode,
  setReviewId,
  setComment,
  setSelectedRating,
  setDeletedReview,
  setIsdeleteMode,
  userId,
}) {
  return (
    <div className="review-card">
      <div className="review-card-top">
        <div className="review-user">
          <div className="review-avatar">
            {review.reviewerName?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="review-name">{review.reviewerName}</p>
            <p className="review-email">{review.reviewerEmail}</p>
          </div>
        </div>
        <div className="review-menu">
          {userId === review.reviewCreatedBy && (
            <>
              <button
                type="button"
                title="Edit review"
                onClick={() => {
                  setIseditMode(true);
                  setReviewId(review.reviewID);
                  setComment(review.comment);
                  setSelectedRating(review.rating);
                }}
              >
                ✎
              </button>
              <button
                type="button"
                title="Delete review"
                onClick={() => {
                  setDeletedReview(review);
                  setIsdeleteMode(true);
                }}
              >
                🗑
              </button>
            </>
          )}
        </div>
      </div>
      <div className="review-rating">
        <div className="stars">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={index < review.rating ? "star-filled" : "star-empty"}
            >
              ★
            </span>
          ))}
        </div>
        <span className="rating-number">{review.rating}.0</span>
      </div>
      <p className="review-comment">"{review.comment}"</p>
      <div className="review-card-footer">
        {review.reviewCreatedBy === userId && (
          <>
            <button
              type="button"
              onClick={() => {
                setIseditMode(true);
                setReviewId(review.reviewId);
                setComment(review.comment);
                setSelectedRating(review.rating);
              }}
            >
              ✎ Edit
            </button>
            <button
              type="button"
              onClick={() => {
                setDeletedReview(review);
                setIsdeleteMode(true);
              }}
            >
              🗑 Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Productdetails({ product, onback }) {
  const ratings = [1, 2, 3, 4, 5];
  const [reviews, setReviews] = useState([]);
  const { userId, token } = useSelector((state) => state.user);
  const [addreview, setAddreview] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [iseditMode, setIseditMode] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [DeletedReview, setDeletedReview] = useState({});
  const [IsdeleteMode, setIsdeleteMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState({
    comments: "",
    rating: null,
  });
  const totalratings = reviews.reduce((sum, review) => sum + review.rating, 0)/Math.max(reviews.length, 1).toFixed(2) || 0;
  const validateform = () => {
    const newErrors = {
      comments: "",
      rating: null,
    };
    if (comment.trim().length === 0) {
      newErrors.comments = "Comment is required";
    }
    if (selectedRating === null) {
      newErrors.rating = "Rating is required";
    }
    setError(newErrors);
    if (newErrors.comments || newErrors.rating) {
      return false;
    }
    return true;
  };

  const discountrate =
    product.amount.price -
    Math.floor((product.amount.price * product.amount.discount) / 100);
  const getReviews = async () => {
    const response = await fetch(
      `https://ecommerce-1-ky2b.onrender.com/reviews/${product.productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      setReviews([]);
      return;
    }
    const data = await response.json();
    setReviews(data);
  };
  const alreadyReviewed = reviews.some(
    (review) => review.reviewCreatedBy === userId,
  );
  useEffect(() => {
    getReviews();
  }, [token]);
  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }
    const isValid = validateform();
    if (!isValid) {
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://ecommerce-1-ky2b.onrender.com/reviews",
        {
          method: iseditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...(iseditMode && { reviewID: reviewId }),
            userId: userId,
            productId: product.productId,
            comment: comment,
            rating: selectedRating,
          }),
        },
      );
      const data = await response.json();
      if (data.statuscode === 200 || data.statuscode === 201) {
        alert(data.message);
        setAddreview(false);
        setIseditMode(false);
        setComment("");
        setSelectedRating(null);
        getReviews();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred while submitting the review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }
    setIsDeleting(true);
    try {
      const response = await fetch(
        `https://ecommerce-1-ky2b.onrender.com/reviews/${DeletedReview.reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (data.statuscode === 204) {
        alert(data.message);
        setIsdeleteMode(false);
        setDeletedReview({});
        getReviews();
      } else {
        alert(data.message);
        setIsdeleteMode(false);
        setDeletedReview({});
      }
    } catch (error) {
      alert("An error occurred while deleting the review. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };
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
              src={`data:${product.contentType};base64,${product.image}`}
              alt={product.productName}
              loading="lazy"
              width={100}
              height={100}
            />
          </div>
        </div>

        <div className="product-summary">
          <span className="product-category">{product.category}</span>

          <h1>{product.productName}</h1>

          <p className="product-description">{product.description}</p>

          <div className="price-section">
            <div>
              <span className="price-label">Current price</span>
              <div className="current-price">${discountrate}</div>
            </div>

            <div className="original-price">${product.amount.price}</div>

            <div className="discount-badge">{product.amount.discount}% OFF</div>
          </div>

          <div className="quick-stats">
            <div className="quick-stat">
              <span className="stat-icon">★</span>
              <div>
                <strong>{totalratings}.0</strong>
                <small>Rating</small>
              </div>
            </div>

            <div className="quick-stat">
              <span className="stat-icon">◉</span>
              <div>
                <strong>{product.stock.totalStock}</strong>
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
          </div>
        </div>

        <div className="details-grid">
          <div className="details-card">
            <h3>Product Details</h3>

            <InfoItem name="Category" value={product.category} />

            <InfoItem name="Brand" value={product.brand} />

            {/* <InfoItem name="SKU" value={product.sku} /> */}

            <InfoItem name="Weight" value={`${product.weight} kgs`} />

            <InfoItem name="Minimum Order" value={product.stock.capacity} />

            <InfoItem name="Stock" value={product.stock.totalStock} />
          </div>

          <div className="details-card">
            <h3>Shipping & Warranty</h3>

            <InfoItem name="Warranty" value={product.warrenty} />

            <InfoItem name="Shipping" value={`${product.shipping} days`} />

            {/* <InfoItem
              name="Dimensions"
              value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`}
            /> */}

            {/* <InfoItem name="Tags" value={product.tags.join(", ")} /> */}

            <InfoItem name="Discount" value={`${product.amount.discount}%`} />

            <InfoItem name="Final Price" value={`$${discountrate}`} />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="product-container reviews-section">
        <div className="reviews-header">
          <div className="section-heading">
            <span className="section-number">02</span>

            <div>
              <p>CUSTOMER FEEDBACK</p>
              <h2>Customer Reviews</h2>
            </div>
          </div>
          {userId !== product.createdBy && !alreadyReviewed && (
            <button
              className="add-review-button"
              onClick={() => setAddreview(true)}
            >
              <span>＋</span>
              Add Review
            </button>
          )}
        </div>
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <div className="no-reviews-icon">💬</div>

            <h3>No reviews yet</h3>

            <p>
              Be the first customer to share your experience with this product.
            </p>
            <p>Didn't allow to comment for your own product</p>
            {userId !== product.createdBy && (
              <button
                className="empty-review-button"
                onClick={() => setAddreview(true)}
              >
                Write the first review
              </button>
            )}
          </div>
        ) : (
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <Card
                key={review.reviewID ?? index}
                review={review}
                product={product}
                setIseditMode={setIseditMode}
                setReviewId={setReviewId}
                setComment={setComment}
                setSelectedRating={setSelectedRating}
                setDeletedReview={setDeletedReview}
                setIsdeleteMode={setIsdeleteMode}
                userId={userId}
              />
            ))}
          </div>
        )}
        {/* REVIEW POPUP */}
        {(addreview || iseditMode) && (
          <div
            className="review-modal-overlay"
            onClick={() => {
              setAddreview(false);
              setIseditMode(false);
            }}
          >
            <div className="review-modal" onClick={(e) => e.stopPropagation()}>
              <div className="review-modal-header">
                <div>
                  <span className="modal-eyebrow">CUSTOMER FEEDBACK</span>
                  <h3>Write a review</h3>
                  <p>Share your experience with this product.</p>
                </div>
                <button
                  className="modal-close"
                  onClick={() => {
                    setAddreview(false);
                    setIseditMode(false);
                    setComment("");
                    setSelectedRating(null);
                  }}
                >
                  ×
                </button>
              </div>
              <div className="review-form">
                {/* RATING */}
                <div className="form-group">
                  <label>
                    Rating
                    <span>*</span>
                  </label>
                  <div className="rating-options">
                    {ratings.map((rating) => (
                      <button
                        type="button"
                        key={rating}
                        className={
                          Number(selectedRating) === rating
                            ? "rating-star active"
                            : "rating-star"
                        }
                        onClick={() => {
                          setSelectedRating(rating);

                          setError((prev) => ({
                            ...prev,
                            rating: "",
                          }));
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  {selectedRating && (
                    <span className="rating-text">
                      {selectedRating} out of 5
                    </span>
                  )}
                  {error.rating && (
                    <span className="field-error">{error.rating}</span>
                  )}
                </div>
                {/* COMMENT */}
                <div className="form-group">
                  <label htmlFor="review-comment">
                    Your review
                    <span>*</span>
                  </label>
                  <textarea
                    id="review-comment"
                    placeholder="Tell us about your experience..."
                    value={comment}
                    maxLength={500}
                    onChange={(e) => {
                      setComment(e.target.value);

                      setError((prev) => ({
                        ...prev,
                        comments: "",
                      }));
                    }}
                  />

                  <div className="character-count">{comment.length}/500</div>

                  {error.comments && (
                    <span className="field-error">{error.comments}</span>
                  )}
                </div>
                {/* ACTIONS */}
                <div className="review-form-actions">
                  <button
                    type="button"
                    className="cancel-review-button"
                    onClick={() => {
                      setAddreview(false);
                      setIseditMode(false);
                      setComment("");
                      setSelectedRating(null);

                      setError({
                        comments: "",
                        rating: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="submit-review-button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="button-spinner"></span>
                        {iseditMode ? "Updating..." : "Submitting..."}
                      </>
                    ) : iseditMode ? (
                      "Update Review"
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {IsdeleteMode && (
        <div
          className="review-modal-overlay"
          onClick={() => {
            setIsdeleteMode(false);
            setDeletedReview({});
          }}
        >
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="review-modal-header">
              <div>
                <span className="modal-eyebrow">
                  reviewId:{DeletedReview.reviewId}
                </span>
                <h3 style={{ marginBottom: "20px" }}>
                  {" "}
                  {DeletedReview.comment}
                </h3>
                <p style={{ fontSize: "18px", color: " #333" }}>
                  Are you sure you want to delete this review?
                </p>
              </div>
              <button
                className="modal-close"
                onClick={() => {
                  setIsdeleteMode(false);
                  setDeletedReview({});
                }}
              >
                ×
              </button>
            </div>
            <div className="review-form">
              {/* ACTIONS */}
              <div className="review-form-actions">
                <button
                  type="button"
                  className="cancel-review-button"
                  onClick={() => {
                    setIsdeleteMode(false);
                    setDeletedReview({});
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="submit-review-button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <span className="button-spinner"></span>
                      Deleting...
                    </>
                  ) : (
                    "Delete Review"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
