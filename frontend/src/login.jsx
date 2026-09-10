import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store/loginstore";
import Header from "./header";
import "./css/login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters long";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Use uppercase, lowercase, number, special character and 8+ characters";
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://ecommerce-1-ky2b.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            email: email,
          }),
        }
      );

      const result = await response.json();

      if (result.statusCode !== 201) {
        alert(result.message);
      } else {
        alert(result.message);

        dispatch(
          setUser({
            userId: result.userId,
            role: result.role,
            name: result.name,
            token: result.token,
          })
        );

        navigate("/Dashboard");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Header />

      <main className="auth-main">
        <section className="login-card">

          <div className="login-card-header">
            <div className="login-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 3H6C4.895 3 4 3.895 4 5V19C4 20.105 4.895 21 6 21H15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M11 12H21"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M18 9L21 12L18 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1>Sign in</h1>

            <p>
              Access your ecommerce account
            </p>
          </div>

          <div className="login-form">

            <div className="form">
              <label>
                <span className="required">*</span>
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />

              {errors.email && (
                <p className="errors">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form">
              <label>
                <span className="required">*</span>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />

              {errors.password && (
                <p className="errors">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              className="login-submit"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <span className="button-arrow">→</span>
                </>
              )}
            </button>

            <div className="auth-divider">
              <span></span>
              <p>New to the platform?</p>
              <span></span>
            </div>

            <div className="signup-link-container">
              <a href="/signup">
                Create an account
              </a>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}