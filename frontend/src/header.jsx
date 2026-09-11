import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "./store/loginstore";

export default function Header({ activeTab = "home", setActiveTab = "home" }) {
  const { userId, role } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <>
      {/* ===================== LOGGED-IN HEADER ===================== */}
      {userId !== null && (
        <header className="enterprise-header">
          {/* Left Section */}
          <div className="header-left">
            {/* Brand */}
            <div className="enterprise-brand">
              <div className="brand-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 10.5L12 3L21 10.5V21H14.5V14.5H9.5V21H3V10.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="brand-text">
                <span className="brand-title">ECOMMERCE</span>
                <span className="brand-subtitle">ENTERPRISE</span>
              </div>
            </div>

            {/* Products */}
            <button
              className={`nav-item ${
                activeTab === "cart" ? "nav-item-active" : ""
              }`}
              onClick={() => setActiveTab("cart")}
              disabled={activeTab === "cart"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 7H18L19.5 21H4.5L6 7Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 7C9 4.8 10.34 3 12 3C13.66 3 15 4.8 15 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

              <span>Products</span>
            </button>

            {/* Admin Add Product */}
            {role.toLowerCase() === "admin" && (
              <button
                className={`nav-item ${
                  activeTab === "products" ? "nav-item-active" : ""
                }`}
                onClick={() => setActiveTab("products")}
                disabled={activeTab === "products"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5V19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <span>Add Product</span>
              </button>
            )}
            {role.toLowerCase() === "admin" && (
              <button
                className={`nav-item ${
                  activeTab === "userproducts" ? "nav-item-active" : ""
                }`}
                onClick={() => setActiveTab("userproducts")}
                disabled={activeTab === "userproducts"}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* User */}
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79014 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M3 21C3 17.6863 5.68629 15 9 15C10.4 15 11.68 15.48 12.68 16.28"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Product */}
                  <path
                    d="M16 13L21 15.5V20L16 22.5L11 20V15.5L16 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M11 15.5L16 18L21 15.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M16 18V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <span>User Products</span>
              </button>
            )}
          </div>         

          {/* Right Section */}
          <div className="header-right">
            {/* Role */}
            <div className="role-badge">
              <span className="role-status"></span>
              <span>{role}</span>
            </div>

            {/* Logout */}
            {location.pathname !== "/login" && (
              <button
                className="logout-btn"
                onClick={() => {
                  dispatch(clearUser());
                  navigate("/login");
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10 17L15 12L10 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21 4V20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <span>Logout</span>
              </button>
            )}
          </div>
        </header>
      )}

      {/* ===================== LOGGED-OUT HEADER ===================== */}
      {userId === null && (
        <header className="public-header">
          {/* Left: Logo */}
          <div className="public-brand">
            <div className="public-brand-icon">
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 10.5L12 3L21 10.5V21H14.5V14.5H9.5V21H3V10.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <div className="public-brand-title">ECOMMERCE</div>
              <div className="public-brand-subtitle">
                DIGITAL COMMERCE PLATFORM
              </div>
            </div>
          </div>

          {/* Center Title */}
          <div className="public-title">
            <span>Welcome To Ecommerce Application</span>
          </div>

          {/* Home */}
          {location.pathname !== "/" && (
            <button
              className="home-btn"
              aria-label="Home"
              title="Home"
              onClick={() => navigate("/")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 10.5L12 3L21 10.5V21H14.5V14.5H9.5V21H3V10.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </header>
      )}

      {/* ===================== HEADER STYLES ===================== */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        /* =========================================================
           ENTERPRISE LOGGED-IN HEADER
        ========================================================= */

        .enterprise-header {
          position: sticky;
          top: 0;
          z-index: 1000;

          width: 100%;
          height: 72px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 28px;

          background:
            linear-gradient(
              180deg,
              rgba(8, 12, 24, 0.98),
              rgba(7, 10, 19, 0.96)
            );

          border-bottom: 1px solid rgba(255, 255, 255, 0.08);

          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.22),
            inset 0 -1px 0 rgba(255, 255, 255, 0.025);

          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
        }

        .enterprise-header::before {
          content: "";

          position: absolute;
          top: 0;
          left: 0;
          right: 0;

          height: 1px;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(99, 102, 241, 0.8),
            rgba(59, 130, 246, 0.8),
            transparent
          );

          opacity: 0.8;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;

          min-width: 350px;
        }

        /* =========================================================
           BRAND
        ========================================================= */

        .enterprise-brand {
          display: flex;
          align-items: center;
          gap: 11px;

          padding-right: 18px;

          margin-right: 6px;

          border-right: 1px solid rgba(255, 255, 255, 0.09);
        }

        .brand-icon {
          width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #ffffff;

          border: 1px solid rgba(96, 165, 250, 0.3);
          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              rgba(59, 130, 246, 0.25),
              rgba(99, 102, 241, 0.12)
            );

          box-shadow:
            0 8px 24px rgba(37, 99, 235, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .brand-title {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1.6px;

          color: #f8fafc;
        }

        .brand-subtitle {
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 1.5px;

          color: #64748b;
        }

        /* =========================================================
           NAVIGATION
        ========================================================= */

        .nav-item {
          height: 42px;

          display: flex;
          align-items: center;
          gap: 9px;

          padding: 0 15px;

          border: 1px solid transparent;
          border-radius: 11px;

          background: transparent;
          color: #94a3b8;

          font-size: 13px;
          font-weight: 600;

          cursor: pointer;

          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
        }

        .nav-item:hover:not(:disabled) {
          color: #f8fafc;

          background: rgba(255, 255, 255, 0.055);

          border-color: rgba(255, 255, 255, 0.08);

          transform: translateY(-1px);
        }

        .nav-item-active {
          color: #ffffff !important;

          background:
            linear-gradient(
              135deg,
              rgba(59, 130, 246, 0.25),
              rgba(79, 70, 229, 0.18)
            ) !important;

          border-color: rgba(96, 165, 250, 0.24) !important;

          box-shadow:
            0 8px 25px rgba(37, 99, 235, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        /* =========================================================
           CENTER
        ========================================================= */

        .header-center {
          position: absolute;

          left: 50%;
          transform: translateX(-50%);

          pointer-events: none;
        }

        .dashboard-title {
          display: flex;
          align-items: center;
          gap: 9px;

          color: #e2e8f0;

          font-size: 14px;
          font-weight: 650;
          letter-spacing: -0.1px;

          white-space: nowrap;
        }

        .dashboard-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #60a5fa;

          box-shadow:
            0 0 0 4px rgba(96, 165, 250, 0.1),
            0 0 15px rgba(96, 165, 250, 0.6);
        }

        /* =========================================================
           RIGHT
        ========================================================= */

        .header-right {
          display: flex;
          align-items: center;
          gap: 11px;

          min-width: 250px;
          justify-content: flex-end;
        }

        .role-badge {
          height: 38px;

          display: flex;
          align-items: center;
          gap: 8px;

          padding: 0 13px;

          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 10px;

          background: rgba(255, 255, 255, 0.035);

          color: #cbd5e1;

          font-size: 12px;
          font-weight: 650;

          text-transform: capitalize;
        }

        .role-status {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #34d399;

          box-shadow: 0 0 10px rgba(52, 211, 153, 0.65);
        }

        .logout-btn {
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          padding: 0 15px;

          border: 1px solid rgba(248, 113, 113, 0.18);
          border-radius: 10px;

          background: rgba(239, 68, 68, 0.08);

          color: #fca5a5;

          font-size: 12px;
          font-weight: 650;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.15);

          border-color: rgba(248, 113, 113, 0.3);

          color: #fecaca;

          transform: translateY(-1px);

          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.1);
        }

        /* =========================================================
           PUBLIC HEADER
        ========================================================= */

        .public-header {
          position: sticky;
          top: 0;
          z-index: 1000;

          width: 100%;
          min-height: 76px;

          display: flex;
          align-items: center;

          padding: 0 32px;

          background:
            linear-gradient(
              180deg,
              rgba(5, 8, 18, 0.98),
              rgba(5, 8, 17, 0.94)
            );

          border-bottom: 1px solid rgba(255, 255, 255, 0.08);

          box-shadow:
            0 12px 45px rgba(0, 0, 0, 0.2);

          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .public-header::before {
          content: "";

          position: absolute;

          top: 0;
          left: 0;
          right: 0;

          height: 1px;

          background: linear-gradient(
            90deg,
            transparent 5%,
            rgba(59, 130, 246, 0.75) 35%,
            rgba(139, 92, 246, 0.75) 65%,
            transparent 95%
          );
        }

        .public-brand {
          display: flex;
          align-items: center;
          gap: 12px;

          flex-shrink: 0;
        }

        .public-brand-icon {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          color: #ffffff;

          background:
            linear-gradient(
              135deg,
              rgba(37, 99, 235, 0.3),
              rgba(124, 58, 237, 0.22)
            );

          border: 1px solid rgba(96, 165, 250, 0.28);

          box-shadow:
            0 10px 30px rgba(37, 99, 235, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .public-brand-title {
          font-size: 14px;
          font-weight: 800;

          letter-spacing: 1.8px;

          color: #f8fafc;
        }

        .public-brand-subtitle {
          margin-top: 3px;

          font-size: 8px;
          font-weight: 600;

          letter-spacing: 1.2px;

          color: #64748b;
        }

        /* =========================================================
           PUBLIC CENTER TITLE
        ========================================================= */

        .public-title {
          position: absolute;

          left: 50%;
          transform: translateX(-50%);

          white-space: nowrap;

          color: #f8fafc;

          font-size: 17px;
          font-weight: 700;

          letter-spacing: -0.35px;
        }

        .public-title span {
          background:
            linear-gradient(
              90deg,
              #f8fafc,
              #cbd5e1
            );

          -webkit-background-clip: text;
          background-clip: text;

          -webkit-text-fill-color: transparent;
        }

        /* =========================================================
           HOME ICON
        ========================================================= */

        .home-btn {
          width: 44px;
          height: 44px;

          margin-left: auto;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #cbd5e1;

          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;

          background: rgba(255, 255, 255, 0.045);

          cursor: pointer;

          transition:
            all 0.22s ease;

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .home-btn:hover {
          color: #ffffff;

          background:
            linear-gradient(
              135deg,
              rgba(59, 130, 246, 0.22),
              rgba(99, 102, 241, 0.16)
            );

          border-color: rgba(96, 165, 250, 0.3);

          transform: translateY(-2px);

          box-shadow:
            0 10px 25px rgba(37, 99, 235, 0.14);
        }

        .home-btn:active {
          transform: translateY(0);
        }

        /* =========================================================
           RESPONSIVE
        ========================================================= */

        @media (max-width: 1050px) {
          .header-left {
            min-width: auto;
          }

          .header-center {
            display: none;
          }

          .header-right {
            min-width: auto;
          }

          .enterprise-brand {
            padding-right: 10px;
            margin-right: 0;
          }

          .brand-text {
            display: none;
          }
        }

        @media (max-width: 700px) {
          .enterprise-header {
            height: 64px;
            padding: 0 14px;
          }

          .header-left {
            gap: 5px;
          }

          .enterprise-brand {
            border-right: none;
            padding-right: 4px;
          }

          .brand-icon {
            width: 38px;
            height: 38px;
          }

          .nav-item {
            width: 40px;
            height: 40px;

            padding: 0;

            justify-content: center;
          }

          .nav-item span {
            display: none;
          }

          .header-right {
            gap: 6px;
          }

          .role-badge {
            width: 38px;
            height: 38px;

            padding: 0;

            justify-content: center;
          }

          .role-badge span:last-child {
            display: none;
          }

          .logout-btn {
            width: 40px;
            height: 40px;

            padding: 0;
          }

          .logout-btn span {
            display: none;
          }

          .public-header {
            min-height: 68px;
            padding: 0 14px;
          }

          .public-brand-subtitle {
            display: none;
          }

          .public-brand-title {
            font-size: 11px;
          }

          .public-brand-icon {
            width: 38px;
            height: 38px;
          }

          .public-title {
            display: none;
          }

          .home-btn {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </>
  );
}
