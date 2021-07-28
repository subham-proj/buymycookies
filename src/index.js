import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./context/context";

/* For routing throughout the web app BrowserRoute is used,
 and for authtication Context API is used*/

ReactDOM.render(
  <Router>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Router>,
  document.getElementById("root")
);
