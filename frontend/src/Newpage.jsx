import { useState, useEffect, lazy } from "react";
import Productdetails from "./Newpage1";
import Cartitems from "./cartitems";
import Todolist from "./Buyingpage";
import { useSelector } from "react-redux";
import Header from "./header";
import "./css/newpage.css";
export default function Newpage() {
  const [products, setproducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [renderpage, setRenderpage] = useState("first");
  const [selectedproduct, setSelectedProduct] = useState();
  const [cart, setCart] = useState([]);

  const rowperpage = 9;

  const lastindex = currentPage * rowperpage;
  const firstindex = lastindex - rowperpage;

  const { userId, role, token } = useSelector((state) => state.user);

  useEffect(() => {
    const getusers = async () => {
      const response = await fetch(
        "https://ecommerce-1-ky2b.onrender.com/products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setproducts(data);
    };

    getusers();
  }, [token]);

  const filtereditems = products.filter((product) => {
    return (
      product.productName.toLowerCase().includes(search.toLowerCase()) ||
      product.amount.price.toString().includes(search.toLowerCase())
    );
  });

  const pageproducts = filtereditems.slice(firstindex, lastindex);

  const totalpages = Math.ceil(filtereditems.length / rowperpage);

  const removefromcart = (product) => {
    const updateCart = cart.filter((item) => item.productId !== product.productId);
    setCart(updateCart);
  };

  useEffect(() => {
    if (cart.length === 0) {
      setRenderpage("first");
    }
  }, [cart]);

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

              <button
                className="view-cart-btn"
                disabled={cart.length === 0}
                onClick={() => setRenderpage("third")}
              >
                View cart
              </button>

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
                      width={100}
                      height={100}
                    />
                  </div>

                  {/* Product Information */}

                  <div className="product-content">
                    <h3>{product.title}</h3>

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

                    <button
                      className="add-cart-btn"
                      onClick={() => {
                        setCart([...cart, product]);
                      }}
                      disabled={cart.some((item) => item.productId === product.productId)}
                    >
                      {cart.some((item) => item.productId === product.productId)
                        ? "Added"
                        : "Add to cart"}
                    </button>
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
    </>
  );
}
