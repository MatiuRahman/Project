import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./reduxStore"; // the store to pass in to the provider
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  //For implimenting the store in the application
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
