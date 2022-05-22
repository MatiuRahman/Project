import {
  ADD_ITEM_CART,
  REMOVE_ITEM_CART,
  CART_SHIPPING_ADDRESS,
  CART_PAYMENT_METHOD,
} from "../constants/cartTypes";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ADD_ITEM_CART:
      const item = action.payload;

      const itemExist = state.cartItems.find((x) => x.product === item.product);

      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === itemExist.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
