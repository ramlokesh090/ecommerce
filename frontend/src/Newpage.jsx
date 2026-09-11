import { useState, useEffect, lazy } from "react";
import Productdetails from "./Newpage1";
import Cartitems from "./cartitems";
import Todolist from "./Buyingpage";
import { useSelector } from "react-redux";
import Header from "./header";
import "./css/newpage.css";
import "./css/productdetails.css";
export default function Newpage({
  products,
  activeTab,
  refreshProducts,
  setProduct,
  setActiveTab,
  setIsEditMode,
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [renderpage, setRenderpage] = useState("first");
  const [selectedproduct, setSelectedProduct] = useState();
  const [cart, setCart] = useState([]);
  const [isDeletemode, setIsDeleteMode] = useState(false);
  const [DeletedProduct, setDeletedProduct] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const rowperpage = 9;

  const lastindex = currentPage * rowperpage;
  const firstindex = lastindex - rowperpage;

  const { userId, role, token } = useSelector((state) => state.user);

  const filtereditems = products.filter((product) => {
    return (
      product.productName.toLowerCase().includes(search.toLowerCase()) ||
      product.amount.price.toString().includes(search.toLowerCase())
    );
  });

  const pageproducts = filtereditems.slice(firstindex, lastindex);

  const totalpages = Math.ceil(filtereditems.length / rowperpage);

  const removefromcart = (product) => {
    const updateCart = cart.filter(
      (item) => item.productId !== product.productId,
    );
    setCart(updateCart);
  };

  useEffect(() => {
    if (cart.length === 0) {
      setRenderpage("first");
    }
  }, [cart]);
  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }
    setIsDeleting(true);
    try {
      const response = await fetch(
        `https://ecommerce-1-ky2b.onrender.com/products/${DeletedProduct.productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (data.statuscode === 201) {
        alert(data.Message);
        setDeletedProduct({});
        setIsDeleteMode(false);
        await refreshProducts();
      } else {
        alert("product deletion is failed");
      }
    } catch (error) {
      alert("An error occurred while deleting the product. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      {renderpage === "first" && (
        <div className="products-page">
          {/* =========================
              TOP CONTROL BAR
          ========================= */}

          <div className="products-toolbar">
            <div className="search-section">
              <label htmlFor="product-search">Search products</label>

              <div className="search-box">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M16.5 16.5L21 21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  id="product-search"
                  value={search}
                  placeholder="Search by product or price"
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />

                {search && (
                  <button
                    className="clear-search"
                    onClick={() => {
                      setSearch("");
                      setCurrentPage(1);
                    }}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* =========================
                CART CONTROLS
            ========================= */}

            <div className="cart-actions">
              {activeTab === "cart" && (
                <div className="cart-count">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 4H5L7.5 16H18L21 7H6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle cx="9" cy="20" r="1" fill="currentColor" />

                    <circle cx="17" cy="20" r="1" fill="currentColor" />
                  </svg>

                  <span>{cart.length} selected</span>
                </div>
              )}
              {activeTab === "cart" && (
                <button
                  className="view-cart-btn"
                  disabled={cart.length === 0}
                  onClick={() => setRenderpage("third")}
                >
                  View cart
                </button>
              )}
              {cart.length > 0 && (
                <button className="remove-all-btn" onClick={() => setCart([])}>
                  Remove all
                </button>
              )}
            </div>
          </div>

          {/* =========================
              PRODUCT GRID
          ========================= */}

          {pageproducts.length > 0 ? (
            <div className="products">
              {pageproducts.map((product) => (
                <div className="product-card" key={product.id}>
                  {/* Product Image */}

                  <div className="product-image-wrapper">
                    <img
                      src={`data:${product.contentType};base64,${product.image}`}
                      alt={product.productName}
                      loading="lazy"
                    />
                  </div>

                  {/* Product Information */}

                  <div className="product-content">
                    <h3>{product.productName}</h3>

                    <p className="product-description">{product.description}</p>

                    <div className="product-price">
                      <span>Price</span>

                      <strong>${product?.amount?.price}</strong>
                    </div>
                  </div>

                  {/* Product Actions */}

                  <div className="product-actions">
                    <button
                      className="details-btn"
                      onClick={() => {
                        setRenderpage("second");
                        setSelectedProduct(product);
                      }}
                    >
                      View Details
                    </button>
                    {activeTab === "cart" && (
                      <button
                        className="add-cart-btn"
                        onClick={() => {
                          setCart([...cart, product]);
                        }}
                        disabled={cart.some(
                          (item) => item.productId === product.productId,
                        )}
                      >
                        {cart.some(
                          (item) => item.productId === product.productId,
                        )
                          ? "Added"
                          : "Add to cart"}
                      </button>
                    )}
                    {activeTab === "userproducts" && (
                      <div className="product-manage-actions">
                        {/* Edit */}
                        <button
                          type="button"
                          className="product-icon-btn edit-icon"
                          title="Edit product"
                          aria-label="Edit product"
                          onClick={() => {
                            setProduct(product);
                            setActiveTab("products");
                            setIsEditMode(true);
                          }}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 20H21"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />

                            <path
                              d="M16.5 3.5C16.8978 3.10218 17.4374 2.87868 18 2.87868C18.5626 2.87868 19.1022 3.10218 19.5 3.5C19.8978 3.89782 20.1213 4.43739 20.1213 5C20.1213 5.56261 19.8978 6.10218 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          className="product-icon-btn delete-icon"
                          title="Delete product"
                          aria-label="Delete product"
                          onClick={() => {
                            setDeletedProduct(product);
                            setIsDeleteMode(true);
                          }}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 7H20"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />

                            <path
                              d="M10 11V17"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />

                            <path
                              d="M14 11V17"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />

                            <path
                              d="M6 7L7 20H17L18 7"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />

                            <path
                              d="M9 7V4H15V7"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-products">
              <div className="empty-icon">🔎</div>

              <h3>No products found</h3>

              <p>Try searching with a different product name or price.</p>
            </div>
          )}

          {/* =========================
              PAGINATION
          ========================= */}

          {totalpages > 0 && (
            <div className="pagination">
              <button
                className="pagination-arrow"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ←<span>Previous</span>
              </button>

              <div className="page-numbers">
                {Array.from(
                  { length: totalpages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    className={
                      currentPage === page
                        ? "page-number active"
                        : "page-number"
                    }
                    disabled={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="pagination-arrow"
                disabled={currentPage === totalpages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <span>Next</span>→
              </button>
            </div>
          )}
        </div>
      )}

      {/* =========================
          PRODUCT DETAILS
      ========================= */}

      {renderpage === "second" && (
        <Productdetails
          product={selectedproduct}
          onback={() => setRenderpage("first")}
        />
      )}

      {/* =========================
          CART
      ========================= */}

      {renderpage === "third" && (
        <Cartitems
          items={cart}
          onBack={() => setRenderpage("first")}
          removefromcart={removefromcart}
          onBuy={() => setRenderpage("fourth")}
        />
      )}

      {/* =========================
          BUYING PAGE
      ========================= */}

      {renderpage === "fourth" && (
        <Todolist onBack={() => setRenderpage("third")} />
      )}
      {isDeletemode && (
        <div
          className="review-modal-overlay"
          onClick={() => {
            setIsDeleteMode(false);
            setDeletedProduct({});
          }}
        >
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="review-modal-header">
              <div>
                <span className="modal-eyebrow">
                  productId:{DeletedProduct.productId}
                </span>
                <h3 style={{ marginBottom: "20px" }}>
                  {" "}
                  {DeletedProduct.productName}
                </h3>
                <p style={{ fontSize: "18px", color: " #333" }}>
                  Are you sure you want to delete this product?
                </p>
              </div>
              <button
                className="modal-close"
                onClick={() => {
                  setIsDeleteMode(false);
                  setDeletedProduct({});
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
                    setIsDeleteMode(false);
                    setDeletedProduct({});
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
    </>
  );
}
