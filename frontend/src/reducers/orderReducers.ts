import { Order, OrderActionTypes, OrderState, OrderDetailActionTypes, OrderDetail, OrderDetailState } from "../constants/orderConstants";


export const initialState: OrderState = {
  order: {
    _id: '',
    image: '',
    name: '',
    rating: 0,
    numReviews: 0,
    price: 0,
    countInStock: 0,
    description: '',
    qty: 0,
    product: '',
  },
  error: '',
  loading: false,
  success: '',
}
export const initialStated: OrderDetailState = {
  order: {
    _id: '',
    shippingAddress: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
    isDelivered: false,
    deliveredAt:new Date(),
    isPaid: false,
    paidAt: new Date(),
    paymentMethod: '',
    orderItems: [],
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  error: '',
  loading: true,
  success: '',
}



type Actions =
  | { type: "ORDER_CREATE_REQUEST" }
  | { type: "ORDER_CREATE_SUCCESS", payload: Order }
  | { type: "ORDER_CREATE_FAIL", payload: string }
  | { type: "ORDER_CREATE_RESET" }

type Actionsd =
  | { type: "ORDER_DETAILS_REQUEST" }
  | { type: "ORDER_DETAILS_SUCCESS", payload: OrderDetail }
  | { type: "ORDER_DETAILS_FAIL", payload: string }



export const orderCreateReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_CREATE_REQUEST:
      return { loading: true };
    case OrderActionTypes.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case OrderActionTypes.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case OrderActionTypes.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};



export const orderDetailsReducer = (state = initialStated, action: Actionsd) => {
  switch (action.type) {
    case OrderDetailActionTypes.ORDER_DETAILS_REQUEST:
      return { loading: true };
    case OrderDetailActionTypes.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case OrderDetailActionTypes.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};