import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_ERROR,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_ERROR,
  ORDER_PAY_RESET,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_ERROR,
  MY_ORDERS_RESET,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_ERROR,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_ERROR,
  ORDER_DELIVERED_RESET,
} from "../constants/orderTypes.js";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { isLoading: true };
    case CREATE_ORDER_SUCCESS:
      return { isLoading: false, success: true, order: action.payload };
    case CREATE_ORDER_ERROR:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderDetailsReducer = (
  state = { isLoading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case ORDER_DETAILS_SUCCESS:
      return { isLoading: false, order: action.payload };
    case ORDER_DETAILS_ERROR:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
//================================================================
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { isLoading: true };
    case ORDER_PAY_SUCCESS:
      return { isLoading: false, success: true };
    case ORDER_PAY_ERROR:
      return { isLoading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
//================================================================
export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { isLoading: true };
    case ORDER_DELIVERED_SUCCESS:
      return { isLoading: false, success: true };
    case ORDER_DELIVERED_ERROR:
      return { isLoading: false, error: action.DELIVEREDload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};
//================================================================
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return { isLoading: true };
    case MY_ORDERS_SUCCESS:
      return { isLoading: false, orders: action.payload };
    case MY_ORDERS_ERROR:
      return { isLoading: false, error: action.payload };
    case MY_ORDERS_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

//============================================================================

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return { isLoading: true };
    case ALL_ORDERS_SUCCESS:
      return { isLoading: false, orders: action.payload };
    case ALL_ORDERS_ERROR:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
