import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "./store/loginstore";
import { useLocation } from "react-router-dom";
export default function Header({ activeTab = "home", setActiveTab = "home" }) {
  const { userId, role } = useSelector((state) => state.user);
  //   const [state, setState] = useState("cart");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <>
      {userId !== null && (
        <div className="header">
          <div>
            <button
              onClick={() => setActiveTab("cart")}
              style={{
                backgroundColor: activeTab === "cart" ? "#3B82F6" : "white",
                borderRadius:"15px",
                padding:"10px",
                color: activeTab === "cart" ? "white" : "black",
              }}
              disabled={activeTab === "cart"}
            >
              products
            </button>
          </div>
          {role.toLowerCase() === "admin" && (
            <div>
              <button
                onClick={() => setActiveTab("products")}
                style={{
                  backgroundColor: activeTab === "products" ? "#3B82F6" : "white",
                  borderRadius:"15px",
                  padding:"10px",
                  color: activeTab === "products" ? "white" : "black",
                }}
                disabled={activeTab === "products"}
              >
                AddProduct
              </button>
            </div>
          )}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <p
              style={{
                display: "flex",
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              Welcome To Dashboard
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              left: "88%",
              transform: "translateX(-50%)",
              backgroundColor: "#2563EB",
              padding: "5px",
              borderRadius:"10px"
            }}
          >
            <p>{role}</p>
          </div>
          {location.pathname !== "/login" && (
            <div style={{ marginLeft: "auto", marginRight: "0" }}>
              <button
              style={{
                borderRadius:"15px",
                padding:"10px",
                backgroundColor:"red",
                fontWeight:"bold",
                color:"white"
              }}
                onClick={() => {
                  dispatch(clearUser());
                  navigate("/login");
                }}
              >
                logOut
              </button>
            </div>
          )}
        </div>
      )}
      {userId === null && (
        <div
          className="header"
          style={{ display: "flex", alignSelf: "center" }}
        >
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>
            Welcome To Ecommerce Application
          </p>
        </div>
      )}
    </>
  );
}
