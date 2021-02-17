import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ContactUs from "./components/auth/Email";
import Contact from "./components/auth/Contact";

ReactDOM.render(
  <React.StrictMode>
    <ContactUs />
  </React.StrictMode>,
  document.getElementById("root")
);
