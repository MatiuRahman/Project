//for making request to backend the api path to fetch the data
import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_ERROR,
  ITEM_LIST_SUCCESS,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_ERROR,
  ITEM_DETAILS_SUCCESS,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_ERROR,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_ERROR,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_ERROR,
  ITEM_CREATE_REVIEW_REQUEST,
  ITEM_CREATE_REVIEW_SUCCESS,
  ITEM_CREATE_REVIEW_ERROR,
  TOP_ITEMS_REQUEST,
  TOP_ITEMS_SUCCESS,
  TOP_ITEMS_ERROR,
} from "../constants/itemsTypes.js";
import axios from "axios";

export const itemsListAction =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ITEM_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({ type: ITEM_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ITEM_LIST_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
//============================================================================
export const itemsDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_DETAILS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// fOR DELETING ITEMS BY ADMIN IN THE ADMIN PRODUCT SECTION
//=============================================================
export const itemsDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_DELETE_REQUEST,
    });
    const {
      userSignIn: { userInfo },
    } = getState();

    const configure = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, configure);

    dispatch({
      type: ITEM_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ITEM_DELETE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// for CREATING PRODUCTS BY USERS
//============================================================================

export const itemsCreateAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_CREATE_REQUEST,
    });
    const {
      userSignIn: { userInfo },
    } = getState();

    const configure = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, configure); // {} as we are not sending any data its post req

    dispatch({
      type: ITEM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_CREATE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//============================================================================

export const itemsUpdateAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_UPDATE_REQUEST,
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
      `/api/products/${product._id}`,
      product,
      configure
    ); // {} as we are not sending any data its post req

    dispatch({
      type: ITEM_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//============================================================================

export const itemsReviewAction =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ITEM_CREATE_REVIEW_REQUEST,
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

      await axios.post(`/api/products/${productId}/reviews`, review, configure); // {} as we are not sending any data its post req

      dispatch({
        type: ITEM_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ITEM_CREATE_REVIEW_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//============================================================================
export const itemsTopAction = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_ITEMS_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({ type: TOP_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TOP_ITEMS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
