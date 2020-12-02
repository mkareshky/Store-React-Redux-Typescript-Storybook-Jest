export interface Order {
  _id: string;
  image: string;
  name: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  description: string;
  qty: number;
  product:string;
 
}
export interface OrderDetail {
  _id: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  isDelivered: boolean;
  deliveredAt: Date;
  isPaid: boolean;
  paidAt: Date;
  paymentMethod: string;
  orderItems:Order[];
  itemsPrice:any;
  shippingPrice:any;
  taxPrice:any;
  totalPrice:any;
}

export enum OrderActionTypes {
  ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST',
  ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS',
  ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL',
  ORDER_CREATE_RESET = 'ORDER_CREATE_RESET',
}


export enum OrderDetailActionTypes {
  ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST',
  ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS',
  ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL',
}


export interface OrderState {
  readonly loading: boolean;
  readonly order: Order | undefined;
  readonly error?: string;
  readonly success: string;
}


export interface OrderDetailState {
  readonly loading: boolean;
  readonly order: OrderDetail | undefined;
  readonly error?: string;
  readonly success: string;
}