import { combineReducers } from "redux";
import {
  itemListReducer,
  itemDetailsReducer,
  itemDeleteReducer,
  itemCreateReducer,
  itemsUpdateReducer,
  itemsReviewReducer,
  itemsTopReducer,
} from "./itemsReducer";
import { cartReducer } from "./cartReducers";
import {
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrdersReducer,
  allOrdersReducer,
  orderDeliveredReducer,
} from "./orderReducers";
import {
  signInReducer,
  registerReducer,
  detailsReducer,
  updateProfileReducer,
  userListReducer,
  userDeleteReducer,
  adminUpdateUserReducer,
} from "./userReducers";

const rootReducer = combineReducers({
  productList: itemListReducer,
  productDetails: itemDetailsReducer,
  productDelete: itemDeleteReducer,
  productCreate: itemCreateReducer,
  productUpdate: itemsUpdateReducer,
  productReview: itemsReviewReducer,
  topProducts: itemsTopReducer,
  cart: cartReducer,
  userSignIn: signInReducer,
  userRegister: registerReducer,
  userDetails: detailsReducer,
  userUpdate: updateProfileReducer,
  createOrder: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDelivered: orderDeliveredReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  adminUpdateUser: adminUpdateUserReducer,
});

export default rootReducer;
