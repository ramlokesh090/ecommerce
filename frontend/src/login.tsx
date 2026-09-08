import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store/loginstore";
import Header from "./header";
export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Please enter at least one uppercase, lowercase, number, special character, and 8 characters";
    }
    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };
  console.log(errors);
  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch("https://ecommerce-1-ky2b.onrender.com/login", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      });
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
          }),
        );
        navigate("/Dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ backgroundColor: "rgb(250, 174, 221)" }}>
      <div>
        <Header />
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "bold",
          backgroundColor: "lightblue",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          margin: "20px auto",
          width: "450px",
        }}
      >
        <p>Welcome to Login Page</p>
      </div>
      <div className="login">
        <div className="form">
          <label>
            <span style={{ color: "red" }}>*</span>Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="errors">{errors.email}</p>}
        </div>
        <div className="form">
          <label>
            <span style={{ color: "red" }}>*</span>Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="errors">{errors.password}</p>}
        </div>
        <div>
          <button className="button" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Don't have an account?{" "}
          <a href="/">
            <p style={{ fontWeight: "bold" }}>Sign up</p>
          </a>
        </div>
      </div>
    </div>
  );
}
