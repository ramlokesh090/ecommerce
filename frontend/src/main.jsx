import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RouterApp from "./RouterApp";
import {Provider} from "react-redux";
import {store} from "./store/reduxstore";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <RouterApp />
    </Provider>
  </StrictMode>
);