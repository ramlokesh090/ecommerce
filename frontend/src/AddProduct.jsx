import { useState } from "react";
import { useSelector } from "react-redux";
import "./css/addproduct.css";

export default function Addproduct({ onBack }) {
  const { userId, token } = useSelector((state) => state.user);

  const [productname, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(null);
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [capacity, setCapacity] = useState("");
  const [weight, setweight] = useState("");
  const [discount, setDiscount] = useState("");
  const [warrenty, setWarrenty] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validate = () => {
    const newErrors = {};

    if (!productname.trim()) {
      newErrors.productname = "Product name is required";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    }

    if (!desc.trim()) {
      newErrors.desc = "Description is required";
    }

    if (!image.trim()) {
      newErrors.image = "Image URL is required";
    }

    if (category === null) {
      newErrors.category = "Category is required";
    }

    if (!stock.trim()) {
      newErrors.stock = "Stock is required";
    }

    if (!brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (!capacity.trim()) {
      newErrors.capacity = "Capacity is required";
    }

    if (!weight.trim()) {
      newErrors.weight = "Weight is required";
    }

    if (!discount.trim()) {
      newErrors.discount = "Discount is required";
    }

    if (!warrenty.trim()) {
      newErrors.warrenty = "Warranty is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const categories = [
    { id: 1, value: "Electronics" },
    { id: 2, value: "Fashion" },
    { id: 3, value: "Home Appliances" },
    { id: 4, value: "Computers & Laptops" },
    { id: 5, value: "Mobile Phones" },
    { id: 6, value: "Furniture" },
    { id: 7, value: "Beauty & Personal Care" },
    { id: 8, value: "Sports & Fitness" },
    { id: 9, value: "Books & Stationery" },
    { id: 10, value: "Groceries" },
    { id: 11, value: "others" },
  ];

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://ecommerce-1-ky2b.onrender.com/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            createdBy: Number(userId),
            productName: productname,
            description: desc,
            imageUrl: image,
            weight: Number(weight),
            brand: brand,
            category: category?.value,
            amount: {
              price: Number(price),
              discount: Number(discount),
            },
            stock: {
              totalStock: Number(stock),
              capacity: Number(capacity),
            },
          }),
        },
      );

      const response1 = await response.json();

      if (response1.statuscode === 201) {
        alert("Product Added successfully");
        onBack();
      } else {
        alert("Product adding is failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-header">
        <div>
          <span className="add-product-eyebrow">PRODUCT MANAGEMENT</span>

          <p className="add-product-title">Add Product</p>

          <p className="add-product-subtitle">
            Create a new product for your ecommerce catalog
          </p>
        </div>
      </div>

      <div className="AddProduct">
        <div className="field">
          <label>
            <span>*</span>Product Name
          </label>

          <input
            placeholder="Enter ProductName"
            value={productname}
            onChange={(e) => setProductName(e.target.value)}
          />

          {errors.productname && <p className="errors">{errors.productname}</p>}
        </div>

        <div className="field">
          <label>
            <span>*</span>Price
          </label>

          <input
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setPrice(value);
            }}
          />

          {errors.price && <p className="errors">{errors.price}</p>}
        </div>

        <div className="field field-position">
          <label>
            <span>*</span>Product Description
          </label>

          <textarea
            placeholder="Enter Product description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          {errors.desc && <p className="errors">{errors.desc}</p>}
        </div>

        <div className="field">
          <label>
            <span>*</span>Image URL
          </label>

          <input
            placeholder="Enter image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          {errors.image && <p className="errors">{errors.image}</p>}
        </div>

        <div className="field">
          <label>
            <span>*</span>Category
          </label>

          <select
            value={category?.id || ""}
            onChange={(e) => {
              setCategory(
                categories.find(
                  (category) => category.id === parseInt(e.target.value),
                ),
              );
            }}
          >
            {category === null && <option value="">Select category</option>}

            {categories.map((categorys) => (
              <option key={categorys.id} value={categorys.id}>
                {categorys.value}
              </option>
            ))}
          </select>

          {errors.category && <p className="errors">{errors.category}</p>}
        </div>

        <div className="field">
          <label>
            <span>*</span>Stock
          </label>

          <input
            type="number"
            placeholder="Enter stock"
            value={stock}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");

              if (value.length <= 5) {
                setStock(value);
              }
            }}
          />

          {errors.stock && <p className="errors">{errors.stock}</p>}
        </div>

        <div className="field">
          <label>
            <span>*</span>Brand
          </label>

          <input
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          {errors.brand && <p className="errors">{errors.brand}</p>}
        </div>

        <div className="field">
          <label>
            <span>*</span>Minimum order capacity
          </label>

          <input
            type="number"
            placeholder="Enter stock capacity"
            value={capacity}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");

              if (value.length <= 5) {
                setCapacity(value);
              }
            }}
          />

          {errors.capacity && <p className="errors">{errors.capacity}</p>}
        </div>

        <div className="field">
          <label>
            <span>*</span>Weight
          </label>

          <input
            type="number"
            placeholder="Enter Weight"
            value={weight}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");

              if (value.length <= 5) {
                setweight(value);
              }
            }}
          />

          {errors.weight && <p className="errors">{errors.weight}</p>}
        </div>

        <div className="field">
          <label>
            <span>*</span>Discount Percentage
          </label>

          <input
            type="number"
            placeholder="Enter Discount in percentage"
            value={discount}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");

              if (value.length <= 3 && Number(value) <= 100) {
                setDiscount(value);
              }
            }}
          />

          {errors.discount && <p className="errors">{errors.discount}</p>}
        </div>

        <div className="field">
          <label>
            <span>*</span>Warrenty
          </label>

          <input
            placeholder="Enter Warrenty"
            value={warrenty}
            onChange={(e) => setWarrenty(e.target.value)}
          />

          {errors.warrenty && <p className="errors">{errors.warrenty}</p>}
        </div>

        <div className="add-product-actions">
          <button className="button1" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <span className="submit-spinner"></span>
                Adding Product...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
