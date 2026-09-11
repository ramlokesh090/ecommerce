import { useState, useEffect } from "react";
import Header from "./header";
import Addproduct from "./AddProduct";
import Newpage from "./Newpage";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("cart");
  const { userId, role, token } = useSelector((state) => state.user);
  const [products, setproducts] = useState([]);
  const [userproducts, setuserproducts] = useState([]);
  const [product, setProduct] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
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
  const getuserproducts = async () => {
    const response = await fetch(
      `https://ecommerce-1-ky2b.onrender.com/products/userid/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    setuserproducts(data);
  };
  useEffect(() => {
    if (activeTab === "cart" && token) {
      getusers();
    }
    if (activeTab === "userproducts" && token) {
      getuserproducts();
    }
  }, [activeTab, token, userId]);
  return (
    <div style={{ backgroundColor: "#0d2122" }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "cart" && (
        <Newpage
          products={products}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          refreshProducts={getusers}
          setProduct={setProduct}
          setIsEditMode={setIsEditMode}
        />
      )}
      {activeTab === "userproducts" && (
        <Newpage
          products={userproducts}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          refreshProducts={getuserproducts}
          setProduct={setProduct}
          setIsEditMode={setIsEditMode}
        />
      )}
      {activeTab === "products" && (
        <Addproduct
          key={`${isEditMode}-${product?.productId ?? "new"}`}
          onBack={() => {
            setIsEditMode(false);
            setProduct(null);
            setActiveTab("cart");
          }}
          onuserback={() => {
            setIsEditMode(false);
            setProduct(null);
            setActiveTab("userproducts");
          }}
          product={product}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      )}
    </div>
  );
}
