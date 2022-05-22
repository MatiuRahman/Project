import axios from "axios";
import {
  ADD_ITEM_CART,
  CART_PAYMENT_METHOD,
  CART_SHIPPING_ADDRESS,
  REMOVE_ITEM_CART,
} from "../constants/cartTypes";

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_ITEM_CART,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCartAction = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const shippingAddAction = (data) => (dispatch) => {
  dispatch({
    type: CART_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const paymentMethodAction = (data) => (dispatch) => {
  dispatch({
    type: CART_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
