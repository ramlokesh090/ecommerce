import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./signup";
import Newpage from "./Newpage";
import Productdetails from "./Newpage1";
import Login from "./login";
import Dashboard from "./Dashboard";
import EcommerceHome from "./homepage";
function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<EcommerceHome />} />
        <Route path="/Newpage" element={<Newpage />} />
        <Route path="/Newpage1" element={<Productdetails/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );  
}

export default RouterApp;