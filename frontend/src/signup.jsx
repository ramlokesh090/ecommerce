import { useState } from "react";
import "./App.css";
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
  const navigate = useNavigate();
  const roles = [
    { id: "user", value: "User" },
    { id: "admin", value: "Admin" },
  ];
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
    if (!lastname.trim()) {
      newErrors.lastname = "last name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "please enter valid email address";
    }
    if (!phone.trim()) {
      newErrors.phone = "phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "please enter 10 digits number";
    }
    if (!role) {
      newErrors.role = "Role is required";
    }
    if (!password.trim()) {
      newErrors.password = "password is required";
    } else if (
      [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$\.!%*?&]{8,}$/,
      ].every((pattern) => !pattern.test(password))
    ) {
      newErrors.password =
        "please enter atleast one uppercase,lowercase,special character,>8 characters";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmpassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmpassword = "password should match confirm password";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch("http://localhost:8081/users", {
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
          email:email
        }),
      });
      const result = await response.json();
      if (result.statuscode !== 201) {
        alert("signup failed");
      } else {
        alert(result.Message);
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div style={{backgroundColor: "#F1F5F9"}}>
      <div>
        <Header/>
      </div>
      <div
        style={{
          width: "500px",
          background: "#10B981",
          color: "white",
          padding: "25px",
          margin: "20px auto",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignSelf: "center",
          textAlign: "center",
          borderRadius: "8px",
          fontSize: "36px",
          fontWeight: "600",
        }}
      >
        <p>Welcome Sign Up Page</p>
      </div>
      <div className="signup">
        <div className="form">
          <label>
            <span style={{ color: "red" }}>*</span>First Name
          </label>
          <input
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          {errors.firstname && <p className="errors">{errors.firstname}</p>}
        </div>
        <div className="form">
          <label>Middle Name</label>
          <input
            placeholder="Middle name"
            value={middlename}
            onChange={(e) => setMiddlename(e.target.value)}
          />
        </div>
        <div className="form">
          <label>
            <span style={{ color: "red" }}>*</span>Last Name
          </label>
          <input
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {errors.lastname && <p className="errors">{errors.lastname}</p>}
        </div>
        <div className="form">
          <label>
            <span style={{ color: "red" }}>*</span>Email Id
          </label>
          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="errors">{errors.email}</p>}
        </div>
        <div className="form">
          <label>
            <span style={{ color: "red" }}>*</span>Phone Number
          </label>
          <input
            type="tel"
            placeholder="PhoneNumber"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="errors">{errors.phone}</p>}
        </div>
        <div className="form">
          <label>
            <span style={{ color: "red" }}>*</span>Role
          </label>
          <select value={role || ""} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.value}>
                {role.value}
              </option>
            ))}
          </select>
          {errors.role && <p className="errors">{errors.role}</p>}
        </div>
        <div className="form">
          <label>
            <span style={{ color: "red" }}>*</span>Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="errors">{errors.password}</p>}
        </div>
        <div className="form">
          <label>
            <span style={{ color: "red" }}>*</span>Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmpassword && (
            <p className="errors">{errors.confirmpassword}</p>
          )}
        </div>
        <div className="button-position">
          <button className="button" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
        <div
          className="button-position"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          Already have an account?
          <a href="/login">
            <p style={{ fontWeight: "bold" }}>Login</p>
          </a>
        </div>
      </div>
    </div>
  );
}
