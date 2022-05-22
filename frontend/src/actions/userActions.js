import axios from "axios";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
  USER_SIGNOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_ERROR,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_ERROR,
} from "../constants/userConstants";
import { MY_ORDERS_RESET } from "../constants/orderTypes.js";

export const signInAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNIN_REQUEST,
    });
    const configure = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      configure
    );

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signOutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: MY_ORDERS_RESET });
  dispatch({ type: USER_LIST_RESET });
};

export const registerAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const configure = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      configure
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const userDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const {
      userSignIn: { userInfo },
    } = getState();

    const configure = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, configure);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdateAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/users/profile`, user, configure);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const {
      userSignIn: { userInfo },
    } = getState();

    const configure = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, configure);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//================================================================================
export const userDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const {
      userSignIn: { userInfo },
    } = getState();

    const configure = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, configure);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//================================================================
export const adminUpdateUserAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_USER_REQUEST,
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

    const { data } = await axios.put(`/api/users/${user._id}`, user, configure);

    dispatch({
      type: ADMIN_UPDATE_USER_SUCCESS,
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
