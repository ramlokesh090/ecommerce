import { useState } from "react";
function Def({ name, value }) {
  return (
    <p style={{ fontWeight: 600, color: "blue" }}>
      {name}:<span style={{ margin: 5, color: "white" }}>{value}</span>
    </p>
  );
}
function Cartcard({ item, remove }) {
  const discountrate =
    item.price - Math.floor((item.price * item.discountPercentage) / 100);
  return (
    <div className="cart">
      <div className="card1">
        <div style={{ flexDirection: "row", display: "flex", gap: "20px" }}>
          <div>
            <img src={item.images[0]} height={100} width={100} />
            <p style={{ color: "indigo", fontWeight: 800 }}>{item.title}</p>
          </div>
        </div>
        <div style={{ margin: 20 }}>
          {item.discountPercentage > 0 && (
            <p style={{ fontWeight: 600, color: "blue" }}>
              Price:<s style={{ margin: 5, color: "red" }}>${item.price}</s>
              <span style={{ margin: 8, color: "white" }}>${discountrate.toFixed(2)}</span>
            </p>
          )}
          {item.discountPercentage === 0 && (
            <p style={{ fontWeight: 600, color: "blue" }}>
              Price:
              <span style={{ margin: 5, color: "white" }}>${item.price}</span>
            </p>
          )}
          <Def name="Warrenty" value={item.warrantyInformation} />
          <Def name="Rating" value={`${item.rating}`} />
          <Def name="Weight" value={`${item.weight}`} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{ color: "red", padding: "5px", fontWeight: 700 }}
            onClick={() => remove(item)}
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
}
export default function Cartitems({ items, onBack, removefromcart,onBuy }) {
    let sum=0
    for(const item of items){
        const price=item.price-Math.floor((item.price * item.discountPercentage) / 100);
        sum+=price;
    }
  return (
    <div>
      <div>
        <button
          onClick={onBack}
          style={{ display: "flex", justifyContent: "flex-start", margin: "10px 10px 10px auto",color:"white",backgroundColor:"blue",padding:"10px" }}
        >
          Back
        </button>
      </div>
      <div>
        {items.map((item) => (
          <div style={{ marginBottom: "10   px" }}>
            <Cartcard key={item.id} item={item} remove={removefromcart} />
          </div>
        ))}
      </div>
      <div>
        <p style={{margin:10,color:"green",fontWeight:800}}>Total Bill:{sum.toFixed(2)}</p>
        <button
          style={{
            padding: "5px",
            fontSize: "20px",
            color: "white",
            backgroundColor: "blue",
            marginBottom: "10px",
            marginTop: "10px",
          }}
          onClick={onBuy}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
