import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./css/addproduct.css";

export default function Addproduct({
  onBack,
  onuserback,
  product,
  isEditMode,
  setIsEditMode,
}) {
  const { userId, token } = useSelector((state) => state.user);

  const [productname, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState(null);
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [capacity, setCapacity] = useState("");
  const [weight, setweight] = useState("");
  const [discount, setDiscount] = useState("");
  const [warrenty, setWarrenty] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState("");
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

    if (!image && !imagePreview) {
      newErrors.image = "Product image is required";
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
    if (!shipping.trim()) {
      newErrors.shipping = "Shipping time is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (isEditMode && product) {
      setProductName(product.productName ?? "");
      setPrice(String(product.amount?.price ?? ""));
      setDesc(product.description ?? "");

      setCategory(categories.find((c) => c.value === product.category) || null);

      setStock(String(product.stock?.totalStock ?? ""));
      setBrand(product.brand ?? "");
      setCapacity(String(product.stock?.capacity ?? ""));
      setweight(String(product.weight ?? ""));
      setDiscount(String(product.amount?.discount ?? ""));
      setWarrenty(product.warrenty ?? "");
      setShipping(String(product.shipping ?? ""));

      // Existing product image
      setImage(null);
      setImagePreview(
        product.image
          ? `data:${product.contentType};base64,${product.image}`
          : "",
      );
    }
  }, [isEditMode, product]);
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
  const reset = () => {
    setProductName("");
    setPrice("");
    setDesc("");
    setCategory(null);
    setStock("");
    setBrand("");
    setCapacity("");
    setweight("");
    setDiscount("");
    setWarrenty("");
    setShipping("");
    setImage(null);
    setImagePreview("");
  };
  useEffect(() => {
  if (!isEditMode) {
    reset();
  }
}, [isEditMode]);
  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    const formData = new FormData();

    const productdata = {
      ...(isEditMode && { productId: product.productId }),
      createdBy: Number(userId),
      productName: productname,
      description: desc,
      weight: Number(weight),
      brand: brand,
      category: category?.value,
      shipping: Number(shipping),
      warrenty: warrenty,
      amount: {
        price: Number(price),
        discount: Number(discount),
      },
      stock: {
        totalStock: Number(stock),
        capacity: Number(capacity),
      },
    };
    formData.append(
      "product",
      new Blob([JSON.stringify(productdata)], { type: "application/json" }),
    );
    if (image) {
      formData.append("image", image);
    }
    try {
      const response = await fetch(
        "https://ecommerce-1-ky2b.onrender.com/products",
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const response1 = await response.json();

      if (response1.statuscode === 201 || response1.statuscode === 204) {
        alert(response1.Message);
        isEditMode ? onuserback() : onBack();
        setIsEditMode(false);
      } else {
        {
          isEditMode
            ? alert("Product editing is failed")
            : alert("Product adding is failed");
        }
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

          <p className="add-product-title">
            {isEditMode ? "Edit Product" : "Add Product"}
          </p>

          <p className="add-product-subtitle">
            {isEditMode
              ? "Update your product information"
              : "Create a new product for your ecommerce catalog"}
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
        <div className="field">
          <label>
            <span>*</span>Shipping(in Days)
          </label>

          <input
            type="number"
            placeholder="Enter Shipping Time"
            value={shipping}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 3) {
                setShipping(value);
              }
            }}
          />

          {errors.shipping && <p className="errors">{errors.shipping}</p>}
        </div>
        <div className="field image-upload-field">
          <label className="field-label">
            <span>*</span> Product Image
          </label>
          <div className="image-upload-container">
            {!image && !imagePreview ? (
              <>
                <input
                  id="product-image"
                  className="hidden-file-input"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (!file) return;

                    if (file.size > 5 * 1024 * 1024) {
                      setErrors((prev) => ({
                        ...prev,
                        image: "Image size must be less than 5 MB",
                      }));
                      return;
                    }

                    setImage(file);

                    setErrors((prev) => ({
                      ...prev,
                      image: "",
                    }));

                    const previewUrl = URL.createObjectURL(file);
                    setImagePreview(previewUrl);
                  }}
                />

                <label htmlFor="product-image" className="upload-dropzone">
                  <div className="upload-text">
                    <strong>Upload product image</strong>

                    <span>Click to browse from your device</span>

                    <small>
                      PNG, JPG, JPEG or WEBP &nbsp; • &nbsp; Maximum 5 MB
                    </small>
                  </div>
                </label>
              </>
            ) : (
              <div className="selected-file">
                <div className="image-preview">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    width={100}
                    height={100}
                  />
                </div>

                <div className="file-details">
                  {image ? (
                    <>
                      <strong>{image.name}</strong>

                      <span>{(image.size / 1024 / 1024).toFixed(2)} MB</span>
                    </>
                  ) : (
                    <>
                      <strong>Current product image</strong>

                      <span>Existing image</span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  className="remove-file-btn"
                  onClick={() => {
                    setImage(null);
                    setImagePreview("");

                    const input = document.getElementById("product-image");

                    if (input) {
                      input.value = "";
                    }

                    setErrors((prev) => ({
                      ...prev,
                      image: "",
                    }));
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          {errors.image && <p className="errors">{errors.image}</p>}
        </div>
        <div className="add-product-actions">
          <button className="button1" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <span className="submit-spinner"></span>
                <span>
                  {isEditMode ? "Updating Product..." : "Adding Product..."}
                </span>
              </>
            ) : isEditMode ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
