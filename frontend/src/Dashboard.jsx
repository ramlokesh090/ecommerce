import { useState } from "react"
import Header from "./header";
import Addproduct from "./AddProduct";
import Newpage from "./Newpage";
export default function Dashboard() {
    const [activeTab, setActiveTab]=useState("cart");
    return(
  <div style={{backgroundColor:"#0d2122"}}>
    <Header activeTab={activeTab} setActiveTab={setActiveTab}/>
    {activeTab === "cart" && <Newpage />}
    {activeTab === "products" && <Addproduct onBack={()=>setActiveTab("cart")}/>}
  </div>
    );
}
