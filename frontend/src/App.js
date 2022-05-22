import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import HomeUI from "./uiScreens/HomeUI";
import ProductUI from "./uiScreens/ProductUI";
import CartUI from "./uiScreens/CartUI";
import SignInUI from "./uiScreens/SignInUI";
import RegisterUI from "./uiScreens/RegisterUI";
import ProfileUI from "./uiScreens/ProfileUI";
import ShippingUI from "./uiScreens/ShippingUI";
import PaymentUI from "./uiScreens/PaymentUI";
import PlaceOrderUI from "./uiScreens/PlaceOrderUI";
import OrderUI from "./uiScreens/OrderUI";
import UserListUI from "./uiScreens/UserListUI";
import UserEditUI from "./uiScreens/UserEditUI";
import ProductListUI from "./uiScreens/ProductListUI";
import ProductEditUI from "./uiScreens/ProductEditUI";
import AllOrdersUI from "./uiScreens/AllOrdersUI";
const App = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/order/:id" element={<OrderUI />} />
            <Route path="/placeorder" element={<PlaceOrderUI />} />
            <Route path="/payment" element={<PaymentUI />} />
            <Route path="/shipping" element={<ShippingUI />} />
            <Route path="/profile" element={<ProfileUI />} />
            <Route path="/register" element={<RegisterUI />} />
            <Route path="/login" element={<SignInUI />} />
            <Route path="/cart" element={<CartUI />} />
            <Route path="/cart/:id" element={<CartUI />} />
            <Route path="/product/:id" element={<ProductUI />} />
            <Route path="/admin/userlist" element={<UserListUI />} />
            <Route path="/admin/user/:id/edit" element={<UserEditUI />} />
            <Route
              exact
              path="/admin/productlist"
              element={<ProductListUI />}
            />
            <Route
              exact
              path="/admin/productlist/:pageNumber"
              element={<ProductListUI />}
            />
            <Route path="/admin/product/:id/edit" element={<ProductEditUI />} />
            <Route path="/admin/orderlist" element={<AllOrdersUI />} />
            <Route exact path="/search/:keyword" element={<HomeUI />} />
            <Route exact path="/page/:pageNumber" element={<HomeUI />} />
            <Route
              exact
              path="/search/:keyword/page/:pageNumber"
              element={<HomeUI />}
            />
            <Route exact path="/" element={<HomeUI />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
