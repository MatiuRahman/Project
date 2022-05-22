import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_ERROR,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_ERROR,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_ERROR,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_ERROR,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_ERROR,
} from "../constants/orderTypes.js";
import axios from "axios";

export const orderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    const {
      userSignIn: { userInfo },
    } = getState();

    const configure = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, configure);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const orderDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const {
      userSignIn: { userInfo },
    } = getState();

    const configure = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, configure);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const orderPayAction =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });
      const {
        userSignIn: { userInfo },
      } = getState();

      const configure = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        configure
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//================================================================
export const orderDeliveredAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVERED_REQUEST,
    });
    const {
      userSignIn: { userInfo },
    } = getState();

    const configure = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      configure
    );

    dispatch({
      type: ORDER_DELIVERED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVERED_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//================================================================
export const myOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_ORDERS_REQUEST,
    });
    const {
      userSignIn: { userInfo },
    } = getState();

    const configure = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, configure);

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//================================================================
export const allOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_ORDERS_REQUEST,
    });
    const {
      userSignIn: { userInfo },
    } = getState();

    const configure = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, configure);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
