import { useState } from "react";
import { useSelector } from "react-redux";

export default function Addproduct({ onBack }) {
  const {userId,token} = useSelector((state) => state.user);
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
  const [errors,setErrors]=useState({})
  const validate=()=>{
    const newErrors = {};
    if(!productname.trim()){
        newErrors.productname="productname is required"
    }
    if(!price.trim()){
        newErrors.price="price is required"
    }
    if(!desc.trim()){
        newErrors.desc="description is required"
    }
    if(!image.trim()){
        newErrors.image="image url is required"
    }
    if(category===null){
        newErrors.category="category is required"
    }
    if(!stock.trim()){
        newErrors.stock="stock is required"
    }
    if(!brand.trim()){
        newErrors.brand="brand is required"
    }
    if(!capacity.trim()){
        newErrors.capacity="capacity is required"
    }
    if(!weight.trim()){
        newErrors.weight="weight is required"
    }
    if(!discount.trim()){
        newErrors.discount="discount is required"
    }
    if(!warrenty.trim()){
        newErrors.warrenty="warrenty is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
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
    if(!validate()){
        return;
    }
    try {
      const response = await fetch("http://localhost:8081/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
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
      });
      const response1=await response.json();
      if (response1.statuscode === 201) {
        alert("product Added succesfully");
        onBack();
      }
      else{
        alert("product adding is failed")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ backgroundColor: "#9eb44e" }}>
      <p
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          padding: "10px",
          color: "#051a20",
        }}
      >
        ADD THE PRODUCT
      </p>
      <div className="AddProduct">
        <div className="field">
          <label>
            <span style={{ color: "red" }}>*</span>Product Name
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
            <span style={{ color: "red" }}>*</span>Price
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
            <span style={{ color: "red" }}>*</span>Product Description
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
            <span style={{ color: "red" }}>*</span>Image URL
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
            <span style={{ color: "red" }}>*</span>Category
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
            {category === null &&(
            <option value="">select category</option>
            )}
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
            <span style={{ color: "red" }}>*</span>stock
          </label>
          <input            
            type="number"
            placeholder="Enter stock"
            value={stock}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 5) setStock(value);
            }}
          />
          {errors.stock && <p className="errors">{errors.stock}</p>}
        </div>
        <div className="field">
          <label>
            <span style={{ color: "red" }}>*</span>Brand
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
            <span style={{ color: "red" }}>*</span>Minimum order capacity
          </label>
          <input
            type="number"            
            placeholder="Enter stock capacity"
            value={capacity}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 5) setCapacity(value);
            }}
          />
          {errors.capacity && <p className="errors">{errors.capacity}</p>}
        </div>
        <div className="field">
          <label>
            <span style={{ color: "red" }}>*</span>Weight
          </label>
          <input            
           type="number"
            placeholder="Enter Weight"
            value={weight}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 5) setweight(value);
            }}
          />
          {errors.weight && <p className="errors">{errors.weight}</p>}
        </div>
        <div className="field">
          <label>
            <span style={{ color: "red" }}>*</span>Discount Percentage
          </label>
          <input
            type="number"
            placeholder="Enter Discount in percentage"
            value={discount}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 3 && Number(value) <= 100)
                setDiscount(value);
            }}
          />
          {errors.discount && <p className="errors">{errors.discount}</p>}
        </div>
        <div className="field">
          <label>
            <span style={{ color: "red" }}>*</span>Warrenty
          </label>
          <input
             placeholder="Enter Warrenty"
            value={warrenty}
            onChange={(e) => setWarrenty(e.target.value)}
          />
          {errors.warrenty && <p className="errors">{errors.warrenty}</p>}
        </div>
        <div style={{ gridColumn: "-1/1", marginTop: "40px" }}>
          <button className="button1" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
