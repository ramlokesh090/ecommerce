import react, { useState } from "react";
function Abc({ name, value }) {
  return (
    <h4 style={{ justifyContent: "flex-start" }}>
      <span style={{ color: "brown", justifyContent: "flex-start" }}>
        {name}
      </span>
      : {value}
    </h4>
  );
}
function Card({ review }) {
  return (
    <div className="card">
      <p
        style={{ color: "red", display: "flex", justifyContent: "flex-start" }}
      >
        Name : <span style={{ color: "white" }}>{review.reviewerName}</span>
      </p>
      <p
        style={{ color: "red", display: "flex", justifyContent: "flex-start" }}
      >
        Email : <span style={{ color: "white" }}> {review.reviewerEmail}</span>
      </p>
      <p style={{ display: "flex" }}>
        <p style={{ color: "red" }}>Rating :</p>
        {Array.from({ length: review.rating }, (_, index) => index + 1).map(
          (star) => (
            <p
              style={{
                color: "gold",
                fontSize: "20px",
                margin: 0,
                gap: "10px",
              }}
            >
              ★
            </p>
          ),
        )}
      </p>
      <p
        style={{
          color: "green",
          fontSize: "30px",
          justifyContent: "flex-start",
        }}
      >
        {review.comment}
      </p>
    </div>
  );
}
export default function Productdetails({ product, onback }) {
  const discountrate =
    product.price -
    Math.floor((product.price * product.discountPercentage) / 100, 2);
  return (
    <div>
      <div>
        <div >
          <div style={{display:"flex",margin:10}}><button onClick={onback} cursor="pointer" >back</button></div>
          <div style={{justifyContent:"center"}}>
          <p style={{ color: "orange", fontSize: 40, marginTop: "20px" }}>
            {product.title}
          </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <img
            src={product.images[0]}
            height={200}
            width={200}
            alt={product.title}
          />
          <div
            style={{ margin: "50px", display: "flex", flexDirection: "column",gap:"30px" }}
          >
            {/* <img
              src={product.meta.qrCode}
              height={50}
              width={50}
              alt={product.title}
            />
            <button style={{backgroundColor:"blue",color:"white",height:"30px"}}>add to cart</button> */}
          </div>
        </div>
        <p
          style={{
            display: "flex",
            maxWidth: "75%",
            textAlign: "center",
            margin: "0 auto",
          }}
        >
          {product.description}
        </p>
      </div>
      <div className="details" style={{ marginTop: "20px" }}>
        <div>
          <Abc name="Category" value={product.category} />
          {/* <h4 style={{justifyContent:"flex-start"}}>
              <span style={{ color: "brown",justifyContent:"flex-start" }}>Price</span>: ${product.price}
            </h4> */}
          <Abc name="price" value={`$${product.price}`} />
          <Abc
            name="Discount Amount"
            value={`$${Math.floor((product.price * product.discountPercentage) / 100, 2)}`}
          />
          <Abc name="Product Price" value={`$${discountrate}`} />
          <Abc name="Rating" value={`${product.rating} stars`} />
          <Abc name="Stock" value={`${product.stock}`} />
          <Abc
            name="Minimum order Quantity"
            value={`${product.minimumOrderQuantity}`}
          />
        </div>
        <div>
          <Abc name="brand" value={product.brand} />
          <Abc name="Weight" value={`${product.weight}kgs`} />
          <Abc name="sku" value={product.sku} />
          <Abc name="Warrenty" value={product.warrantyInformation} />
          <Abc name="tags" value={product.tags.map((tag) => `${tag},`)} />
          <Abc
            name="dimensions"
            value={`${product.dimensions.width},${product.dimensions.height},${product.dimensions.depth}(width,height,depth)`}
          />
          <Abc name="shipping info" value={product.shippingInformation} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3 style={{ color: "indigo", fontSize: "30px", margin: 5 }}>
          Reviews
        </h3>
        {product.reviews.map((review) => (
          <div style={{ marginBottom: "5px", display: "flex" }}>
            <Card review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}
