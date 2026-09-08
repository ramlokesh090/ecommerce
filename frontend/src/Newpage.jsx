import { useState, useEffect, lazy } from "react";
import Productdetails from "./Newpage1";
import Cartitems from "./cartitems";
import Todolist from "./Buyingpage";
import {useSelector} from "react-redux";
import Header from "./header";
export default function Newpage() {
  const [products, setproducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [renderpage, setRenderpage] = useState("first");
  const [selectedproduct, setSelectedProduct] = useState();
  const [cart, setCart] = useState([]);
  const rowperpage = 9;
  const lastindex = currentPage * rowperpage;
  const firstindex = lastindex - rowperpage;
  const {userId,role} = useSelector((state)=>state.user);
  useEffect(() => {
    const getusers = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setproducts(data.products);
    };
    getusers();
  }, []);
  const filtereditems = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.price.toString().includes(search.toLowerCase())
    );
  });
  const pageproducts = filtereditems.slice(firstindex, lastindex);
  const totalpages = Math.ceil(filtereditems.length / rowperpage);
  //  for(let i=0;i<=totalpages;i++){
  //   buttons.push(<button key={i} onClick={()=>setCurrentPage(i)}>{i}</button>)
  // }
  const removefromcart = (product) => {
    const updateCart = cart.filter((item) => item.id !== product.id);
    setCart(updateCart);
  };
  useEffect(() => {
    if (cart.length === 0) {
      setRenderpage("first");
    }
  }, [cart]);
  return (
    <>
    {/* <div>
      <Header/>
    </div> */}
      {renderpage === "first" && (
        <div>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              marginBottom: "40px",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor:"#123456"
            }}
          >
            <div style={{ display: "flex", gap: "20px", margin: 30 }}>
              <p>Search :</p>
              <input
                value={search}
                placeholder="search here"
                onChange={(e) => {
                  (setSearch(e.target.value), setCurrentPage(1));
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "20px", margin: 30 }}>
              <p>{cart.length} selected</p>
              <button
                disabled={cart.length === 0}
                onClick={() => setRenderpage("third")}
              >
                View
              </button>
              {cart.length > 0 && (
                <button
                  onClick={() => setCart([])}
                >
                  Remove all  
                </button>
              )}
            </div>
          </div>
          <div className="products">
            {pageproducts.map((product) => (
              <div key={product.id}>
                <img
                  src={product.images[0]}
                  width={100}
                  height={100}
                  alt={product.title}
                  loading={lazy}
                />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p style={{ color: "blue" }}>
                  <span style={{ color: "red", fontWeight: 600 }}>Price</span>:$
                  {product.price}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    margin: 7,
                  }}
                >
                  <button
                    style={{ color: "white", backgroundColor: "green" }}
                    onClick={() => {
                      (setRenderpage("second"), setSelectedProduct(product));
                    }}
                  >
                    View Details
                  </button>
                  <button
                    style={{ color: "white", backgroundColor: "green" }}
                    onClick={() => {
                      setCart([...cart, product]);
                    }}
                    disabled={cart.some((item) => item.id === product.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              marginBottom: "20px",
              alignitems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <div style={{ display: "flex", gap: "10px" }}>
              {/*{buttons}  line this we has to write using the for loop okay*/}
              {Array.from({ length: totalpages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    disabled={currentPage === page}
                    style={{
                      color: currentPage === page ? "white" : "black",
                      backgroundColor: currentPage === page ? "blue" : "grey",
                    }}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
            <button
              disabled={currentPage === totalpages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {renderpage === "second" && (
        <Productdetails
          product={selectedproduct}
          onback={() => setRenderpage("first")}
        />
      )}
      {renderpage === "third" && (
        <Cartitems
          items={cart}
          onBack={() => setRenderpage("first")}
          removefromcart={removefromcart}
          onBuy={()=>setRenderpage("fourth")}
        />  
      )}
      {renderpage === "fourth" && (
        <Todolist
        onBack={()=>setRenderpage("third")}
        />
      )}
    </>
  );
}
