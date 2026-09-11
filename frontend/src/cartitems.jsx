import { useState } from "react";
import "./css/cartitems.css";
import "./css/productdetails.css";

function Def({ name, value }) {
  return (
    <div className="cart-detail-row">
      <span className="cart-detail-label">{name}</span>
      <span className="cart-detail-value">{value}</span>
    </div>
  );
}

function Cartcard({ item, remove }) {
  const discountrate =
    item.amount.price -
    Math.floor((item.amount.price * item.amount.discount) / 100);

  return (
    <article className="cart-product-card">
      {/* Product Image */}
      <div className="cart-product-image-wrapper">
        <img
          src={`data:${item.contentType};base64,${item.image}`}
          alt={item.productName}
          loading="lazy"
          width={100}
          height={100}
        />
      </div>

      {/* Product Information */}
      <div className="cart-product-main">
        <div className="cart-product-heading">
          <span className="cart-product-category">{item.category}</span>

          <h2 className="cart-product-title">{item.productName}</h2>
        </div>

        {/* Price */}
        <div className="cart-price-section">
          {item.amount.discount > 0 ? (
            <>
              <span className="cart-price-label">Price</span>

              <span className="cart-old-price">${item.amount.price}</span>

              <span className="cart-current-price">
                ${discountrate.toFixed(2)}
              </span>

              <span className="cart-discount">{item.amount.discount}% OFF</span>
            </>
          ) : (
            <>
              <span className="cart-price-label">Price</span>

              <span className="cart-current-price">${item.amount.price}</span>
            </>
          )}
        </div>

        {/* Product Details */}
        <div className="cart-details-grid">
          <Def name="Warranty" value={item.warrenty} />

          <Def name="Rating" value={`${5}`} />

          <Def name="Weight" value={`${item.weight}`} />
        </div>
      </div>

      {/* Remove */}
      <div className="cart-product-actions">
        <button
          className="remove-cart-button"
          onClick={() => remove(item)}
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6H21"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M8 6V4.5C8 3.67 8.67 3 9.5 3H14.5C15.33 3 16 3.67 16 4.5V6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M19 6L18.3 20.3C18.26 21.25 17.48 22 16.53 22H7.47C6.52 22 5.74 21.25 5.7 20.3L5 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M10 10V18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M14 10V18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <span>Remove</span>
        </button>
      </div>
    </article>
  );
}

export default function Cartitems({ items, onBack, removefromcart, onBuy }) {
  let sum = 0;
  const [payment, setpayment] = useState(false);
  for (const item of items) {
    const price =
      item.amount.price -
      Math.floor((item.amount.price * item.amount.discount) / 100);

    sum += price;
  }

  return (
    <div className="cart-page">
      {/* Background decoration */}
      <div className="cart-background-glow cart-glow-one"></div>
      <div className="cart-background-glow cart-glow-two"></div>

      <div className="cart-container">
        {/* Header */}
        <header className="cart-header">
          <div className="cart-header-left">
            <button
              className="cart-back-button"
              onClick={onBack}
              type="button"
              aria-label="Back to products"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Back</span>
            </button>
          </div>

          <div className="cart-header-title">
            <div className="cart-title-icon">
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 4H5L7.2 15.2C7.4 16.2 8.28 17 9.3 17H17.5C18.45 17 19.28 16.34 19.48 15.42L21 8H6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle cx="10" cy="20" r="1.2" fill="currentColor" />

                <circle cx="17" cy="20" r="1.2" fill="currentColor" />
              </svg>
            </div>

            <div>
              <h1>Your Cart</h1>
              <p>
                {items.length} {items.length === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>

          <div className="cart-item-count">{items.length}</div>
        </header>

        {/* Cart Products */}
        <main className="cart-content">
          <section className="cart-products-section">
            {items.map((item) => (
              <Cartcard key={item.id} item={item} remove={removefromcart} />
            ))}
          </section>

          {/* Summary */}
          <aside className="cart-summary">
            <div className="summary-heading">
              <span>Order Summary</span>
            </div>

            <div className="summary-line">
              <span>Items</span>
              <span>{items.length}</span>
            </div>

            <div className="summary-line">
              <span>Subtotal</span>
              <span>${sum.toFixed(2)}</span>
            </div>

            <div className="summary-line">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <div>
                <span>Total</span>
                <small>Including applicable discounts</small>
              </div>

              <strong>${sum.toFixed(2)}</strong>
            </div>

            <button
              className="checkout-button"
              onClick={() => {
                setpayment(true);
              }}
              type="button"
            >
              <span>Proceed to Buy</span>

              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="secure-checkout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10V7.5C7 4.74 9.24 2.5 12 2.5C14.76 2.5 17 4.74 17 7.5V10"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
              </svg>
              Secure checkout
            </div>
          </aside>
        </main>
      </div>
      {payment && (
        <div
          className="payment-modal-overlay"
          onClick={() => {
            setpayment(false);
            onBack();
          }}
        >
          <div
            className="payment-success-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="payment-modal-close"
              aria-label="Close"
              onClick={() => {
                setpayment(false);
                onBack();
              }}
            >
              ×
            </button>

            {/* Success Icon */}
            <div className="payment-success-icon">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            {/* Content */}
            <div className="payment-success-content">
              <span className="payment-eyebrow">PAYMENT SUCCESSFUL</span>

              <h2>Payment Completed</h2>

              <p className="payment-message">
                Your payment has been successfully processed.
              </p>

              {/* Amount */}
              <div className="payment-amount-card">
                <span className="payment-amount-label">Amount Paid</span>

                <span className="payment-amount">${sum.toFixed(2)}</span>
              </div>

              <p className="payment-thank-you">Thank you for your purchase.</p>
            </div>

            {/* Action */}
            <div className="payment-modal-action">
              <button
                type="button"
                className="payment-dashboard-button"
                onClick={() => {
                  setpayment(false);
                  onBack();
                }}
              >
                Go Back to Dashboard
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
