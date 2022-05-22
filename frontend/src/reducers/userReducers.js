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
  ADMIN_UPDATE_USER_RESET,
} from "./../constants/userConstants";
export const signInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { isLoading: true };
    case USER_SIGNIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload };
    case USER_SIGNIN_ERROR:
      return { isLoading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { isLoading: true };
    case USER_REGISTER_SUCCESS:
      return { isLoading: false, userInfo: action.payload };
    case USER_REGISTER_ERROR:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const detailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case USER_DETAILS_SUCCESS:
      return { isLoading: false, user: action.payload };
    case USER_DETAILS_ERROR:
      return { isLoading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { isLoading: true };
    case USER_UPDATE_SUCCESS:
      return { isLoading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_ERROR:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { isLoading: true };
    case USER_LIST_SUCCESS:
      return { isLoading: false, users: action.payload };
    case USER_LIST_ERROR:
      return { isLoading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { isLoading: true };
    case USER_DELETE_SUCCESS:
      return { isLoading: false, success: true };
    case USER_DELETE_ERROR:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminUpdateUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { isLoading: true };
    case ADMIN_UPDATE_USER_SUCCESS:
      return { isLoading: false, success: true };
    case ADMIN_UPDATE_USER_ERROR:
      return { isLoading: false, error: action.payload };
    case ADMIN_UPDATE_USER_RESET:
      return { user: {} };

    default:
      return state;
  }
};
