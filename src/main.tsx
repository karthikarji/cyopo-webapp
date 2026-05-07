import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import ReduxStore from "@cyopo/Redux/store/ReduxStore";
import App from "@cyopo/App/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={ReduxStore}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>,
);
