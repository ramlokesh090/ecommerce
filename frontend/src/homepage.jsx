import { useNavigate } from "react-router-dom";
import "./css/homepage.css";

const GET_STARTED_PATH = "/signup";

export default function EcommerceHome() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* Navigation */}
      <nav className="home-nav">
        <div className="home-logo">
          <div className="logo-mark">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div>
            <h2>Ecommerce</h2>
            <p>ENTERPRISE PLATFORM</p>
          </div>
        </div>

        <div className="home-nav-links">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Home
          </button>

          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Features
          </button>

          <button
            onClick={() =>
              document
                .getElementById("platform")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Platform
          </button>
        </div>

        <div className="home-nav-actions">
          <button
            className="nav-login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="nav-get-started"
            onClick={() => navigate(GET_STARTED_PATH)}
          >
            Get Started
            <span>→</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="home-main">
        <section className="hero-section">

          <div className="hero-content">

            <div className="hero-badge">
              <span className="status-dot"></span>
              Next-generation commerce platform
            </div>

            <h1>
              Build.
              <br />
              <span>Scale.</span>
              <br />
              Grow.
            </h1>

            <p className="hero-description">
              A modern ecommerce platform designed to help businesses
              manage products, customers and orders through one powerful
              digital experience.
            </p>

            <div className="hero-actions">
              <button
                className="hero-primary"
                onClick={() => navigate(GET_STARTED_PATH)}
              >
                Get Started
                <span>→</span>
              </button>

              <button
                className="hero-secondary"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <strong>99.9%</strong>
                <span>Platform availability</span>
              </div>

              <div className="trust-line"></div>

              <div className="trust-item">
                <strong>24/7</strong>
                <span>Business access</span>
              </div>

              <div className="trust-line"></div>

              <div className="trust-item">
                <strong>Secure</strong>
                <span>Data architecture</span>
              </div>
            </div>

          </div>

          {/* 3D Product Visual */}
          <div className="hero-visual">

            <div className="visual-glow"></div>

            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>

            <div className="dashboard-3d">

              <div className="dashboard-top">
                <div className="dashboard-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="dashboard-title">
                  Commerce Overview
                </div>

                <div className="dashboard-status">
                  Live
                </div>
              </div>

              <div className="dashboard-body">

                <div className="dashboard-welcome">
                  <div>
                    <small>BUSINESS PERFORMANCE</small>
                    <h3>Commerce Dashboard</h3>
                  </div>

                  <div className="growth">
                    +24.8%
                  </div>
                </div>

                <div className="dashboard-chart">
                  <div className="chart-labels">
                    <span>$50K</span>
                    <span>$40K</span>
                    <span>$30K</span>
                    <span>$20K</span>
                    <span>$10K</span>
                  </div>

                  <div className="chart-area">
                    <div className="chart-grid grid-one"></div>
                    <div className="chart-grid grid-two"></div>
                    <div className="chart-grid grid-three"></div>
                    <div className="chart-grid grid-four"></div>

                    <svg
                      className="chart-line"
                      viewBox="0 0 500 180"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="chartGradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" />
                          <stop offset="100%" />
                        </linearGradient>
                      </defs>

                      <path
                        d="M0 145
                           C45 135 55 125 90 132
                           C125 140 130 108 165 112
                           C205 116 210 78 245 88
                           C280 98 292 62 325 70
                           C355 78 365 45 395 52
                           C430 60 455 25 500 15"
                        fill="none"
                        stroke="url(#chartGradient)"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="dashboard-cards">

                  <div className="mini-card">
                    <span>Total Revenue</span>
                    <strong>$48,290</strong>
                    <small>↗ 18.4%</small>
                  </div>

                  <div className="mini-card">
                    <span>Orders</span>
                    <strong>2,846</strong>
                    <small>↗ 12.7%</small>
                  </div>

                  <div className="mini-card">
                    <span>Customers</span>
                    <strong>8,421</strong>
                    <small>↗ 21.2%</small>
                  </div>

                </div>

              </div>
            </div>

            {/* Floating cards */}

            <div className="floating-card floating-one">
              <div className="floating-icon">↗</div>
              <div>
                <small>Revenue Growth</small>
                <strong>+32.6%</strong>
              </div>
            </div>

            <div className="floating-card floating-two">
              <div className="product-icon">◈</div>
              <div>
                <small>Active Products</small>
                <strong>1,248</strong>
              </div>
            </div>

            <div className="floating-card floating-three">
              <div className="secure-icon">✓</div>
              <div>
                <small>System Status</small>
                <strong>Operational</strong>
              </div>
            </div>

          </div>

        </section>

        {/* Platform Section */}
        <section id="platform" className="platform-section">

          <div className="section-heading">
            <span>ONE PLATFORM</span>
            <h2>Everything your commerce needs.</h2>
            <p>
              A streamlined architecture designed for modern businesses
              that need simplicity today and scalability tomorrow.
            </p>
          </div>

          <div className="platform-grid">

            <div className="platform-card platform-card-large">
              <div className="platform-number">01</div>

              <div className="platform-icon">
                ◇
              </div>

              <h3>Product Management</h3>

              <p>
                Organize and manage your complete product catalog
                through a centralized experience.
              </p>

              <div className="card-line"></div>
            </div>

            <div className="platform-card">
              <div className="platform-number">02</div>

              <div className="platform-icon">
                ◎
              </div>

              <h3>Smart Operations</h3>

              <p>
                Keep your commerce operations organized with
                intuitive workflows.
              </p>

              <div className="card-line"></div>
            </div>

            <div className="platform-card">
              <div className="platform-number">03</div>

              <div className="platform-icon">
                ◫
              </div>

              <h3>Secure Access</h3>

              <p>
                Role-based access keeps business data protected
                and controlled.
              </p>

              <div className="card-line"></div>
            </div>

          </div>
        </section>

        {/* Features */}
        <section id="features" className="features-section">

          <div className="features-heading">
            <div>
              <span>ENGINEERED FOR SCALE</span>
              <h2>Simple experience.<br />Powerful foundation.</h2>
            </div>

            <p>
              Designed around the needs of growing ecommerce
              businesses without unnecessary complexity.
            </p>
          </div>

          <div className="feature-list">

            <div className="feature-row">
              <span className="feature-index">01</span>

              <div className="feature-name">
                <h3>Centralized Management</h3>
              </div>

              <p>
                Manage products and business operations
                from a single workspace.
              </p>

              <span className="feature-arrow">↗</span>
            </div>

            <div className="feature-row">
              <span className="feature-index">02</span>

              <div className="feature-name">
                <h3>Responsive Experience</h3>
              </div>

              <p>
                A consistent experience across desktop,
                tablet and mobile devices.
              </p>

              <span className="feature-arrow">↗</span>
            </div>

            <div className="feature-row">
              <span className="feature-index">03</span>

              <div className="feature-name">
                <h3>Modern Architecture</h3>
              </div>

              <p>
                Built with a scalable architecture ready
                for evolving business requirements.
              </p>

              <span className="feature-arrow">↗</span>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="home-cta">

          <div className="cta-glow"></div>

          <div className="cta-content">
            <span>READY TO BEGIN?</span>

            <h2>
              Your commerce platform
              <br />
              starts here.
            </h2>

            <p>
              Create your account and experience a modern
              ecommerce workspace.
            </p>

            <button
              className="cta-button"
              onClick={() => navigate(GET_STARTED_PATH)}
            >
              Get Started
              <span>→</span>
            </button>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="home-footer">

        <div className="footer-brand">
          <div className="logo-mark small-logo">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div>
            <strong>Ecommerce</strong>
            <span>Enterprise Commerce Platform</span>
          </div>
        </div>

        <div className="footer-right">
          <span>Modern commerce experience</span>
          <span>© 2026 Ecommerce</span>
        </div>

      </footer>

    </div>
  );
}