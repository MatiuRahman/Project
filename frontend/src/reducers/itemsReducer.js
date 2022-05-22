// returns the updated state of the product store
// whenever we make a reducer we have to add it to the store
import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_ERROR,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_ERROR,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_ERROR,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_ERROR,
  ITEM_CREATE_RESET,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_ERROR,
  ITEM_UPDATE_RESET,
  ITEM_CREATE_REVIEW_REQUEST,
  ITEM_CREATE_REVIEW_SUCCESS,
  ITEM_CREATE_REVIEW_ERROR,
  ITEM_CREATE_REVIEW_RESET,
  TOP_ITEMS_REQUEST,
  TOP_ITEMS_SUCCESS,
  TOP_ITEMS_ERROR,
} from "../constants/itemsTypes";

export const itemListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { isLoading: true, products: [] };
    case ITEM_LIST_SUCCESS:
      return {
        isLoading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.pages,
      };
    case ITEM_LIST_ERROR:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
//================================================================
export const itemDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return { isLoading: true, ...state };
    case ITEM_DETAILS_SUCCESS:
      return { isLoading: false, product: action.payload };
    case ITEM_DETAILS_ERROR:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
//================================================================

export const itemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { isLoading: true };
    case ITEM_DELETE_SUCCESS:
      return { isLoading: false, success: true };
    case ITEM_DELETE_ERROR:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
//================================================================

export const itemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_CREATE_REQUEST:
      return { isLoading: true };
    case ITEM_CREATE_SUCCESS:
      return { isLoading: false, success: true, product: action.payload };
    case ITEM_CREATE_ERROR:
      return { isLoading: false, error: action.payload };
    case ITEM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//================================================================

export const itemsUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { isLoading: true };
    case ITEM_UPDATE_SUCCESS:
      return { isLoading: false, success: true, product: action.payload };
    case ITEM_UPDATE_ERROR:
      return { isLoading: false, error: action.payload };
    case ITEM_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
//================================================================

export const itemsReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case ITEM_CREATE_REVIEW_SUCCESS:
      return { isLoading: false, success: true };
    case ITEM_CREATE_REVIEW_ERROR:
      return { isLoading: false, error: action.payload };
    case ITEM_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
//================================================================

export const itemsTopReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case TOP_ITEMS_REQUEST:
      return { isLoading: true, products: [] };
    case TOP_ITEMS_SUCCESS:
      return { isLoading: false, products: action.payload };
    case TOP_ITEMS_ERROR:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
