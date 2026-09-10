import { useState } from "react";
import "./css/signup.css";
import { useNavigate } from "react-router-dom";
import Header from "./header";

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const roles = [
    { id: "user", value: "User" },
    { id: "admin", value: "Admin" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    if (!lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      newErrors.email = "Please enter valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Please enter 10 digits number";
    }

    if (!role) {
      newErrors.role = "Role is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$\.!%*?&]{8,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Use uppercase, lowercase, number, special character and 8+ characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmpassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmpassword =
        "Password should match confirm password";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://ecommerce-1-ky2b.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            firstName: firstname,
            middleName: middlename,
            lastName: lastname,
            phoneNumber: phone,
            role: role,
            password: password,
            confirmPassword: confirmPassword,
            email: email,
          }),
        }
      );

      const result = await response.json();

      if (result.statuscode !== 201) {
        setLoading(false);
        alert(result.Message);
      } else {
        setLoading(false);
        alert(result.Message);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <div className="signup-page">
      <Header />

      <main className="signup-container">
        <section className="signup-card">

          {/* Header */}
          <div className="signup-heading">
            <div className="signup-logo">
              <span>EC</span>
            </div>

            <div>
              <p className="signup-eyebrow">ACCOUNT REGISTRATION</p>
              <h1>Create your account</h1>
              <p className="signup-subtitle">
                Enter your details to continue.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="signup-form">

            <div className="form-row">

              <div className="form">
                <label>
                  <span>*</span>
                  First Name
                </label>

                <input
                  placeholder="First name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  disabled={loading}
                />

                {errors.firstname && (
                  <p className="errors">{errors.firstname}</p>
                )}
              </div>

              <div className="form">
                <label>Middle Name</label>

                <input
                  placeholder="Middle name"
                  value={middlename}
                  onChange={(e) => setMiddlename(e.target.value)}
                  disabled={loading}
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form">
                <label>
                  <span>*</span>
                  Last Name
                </label>

                <input
                  placeholder="Last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  disabled={loading}
                />

                {errors.lastname && (
                  <p className="errors">{errors.lastname}</p>
                )}
              </div>

              <div className="form">
                <label>
                  <span>*</span>
                  Email
                </label>

                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />

                {errors.email && (
                  <p className="errors">{errors.email}</p>
                )}
              </div>

            </div>

            <div className="form-row">

              <div className="form">
                <label>
                  <span>*</span>
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="10 digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />

                {errors.phone && (
                  <p className="errors">{errors.phone}</p>
                )}
              </div>

              <div className="form">
                <label>
                  <span>*</span>
                  Role
                </label>

                <select
                  value={role || ""}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select role</option>

                  {roles.map((role) => (
                    <option key={role.id} value={role.value}>
                      {role.value}
                    </option>
                  ))}
                </select>

                {errors.role && (
                  <p className="errors">{errors.role}</p>
                )}
              </div>

            </div>

            <div className="form-row">

              <div className="form">
                <label>
                  <span>*</span>
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />

                {errors.password && (
                  <p className="errors">{errors.password}</p>
                )}
              </div>

              <div className="form">
                <label>
                  <span>*</span>
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  disabled={loading}
                />

                {errors.confirmpassword && (
                  <p className="errors">
                    {errors.confirmpassword}
                  </p>
                )}
              </div>

            </div>

            {/* Signup Button */}
            <button
              className={`signup-button ${
                loading ? "signup-loading" : ""
              }`}
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="signup-arrow">→</span>
                </>
              )}
            </button>

            {/* Login */}
            <div className="signup-login">
              <span>Already have an account?</span>

              <button
                type="button"
                onClick={() => navigate("/login")}
                disabled={loading}
              >
                Sign in
              </button>
            </div>

          </div>
        </section>
      </main>

      {/* Loading Overlay */}
      {loading && (
        <div className="signup-loading-overlay">
          <div className="loading-modal">

            <div className="loading-spinner"></div>

            <h3>Creating your account</h3>

            <p>
              Please wait while we securely process your
              registration.
            </p>

            <div className="loading-progress">
              <span></span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}