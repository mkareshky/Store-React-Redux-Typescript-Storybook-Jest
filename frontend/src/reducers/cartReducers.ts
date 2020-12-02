import { CartItem, CartItemState, CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, ShippingItem } from '../constants/cartConstants';


export const initialStatec: CartItemState = {
  cartItems: [],
  shippingAddress: {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
  totalPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  itemsPrice: 0,
  paymentMethod:'',

}


type Actions =
  | { type: "CART_ADD_ITEM", payload: CartItem }
  | { type: "CART_REMOVE_ITEM", payload: string }
  | { type: "CART_SAVE_SHIPPING_ADDRESS", payload: ShippingItem }
  | { type: "CART_SAVE_PAYMENT_METHOD", payload: string }
  | { type: "CART_EMPTY", payload: [] }



export const cartReducer = (state = initialStatec, action: Actions) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem: CartItem | undefined = state.cartItems.find((x: CartItem) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems?.map((x: CartItem) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x: CartItem) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
      case CART_EMPTY:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};