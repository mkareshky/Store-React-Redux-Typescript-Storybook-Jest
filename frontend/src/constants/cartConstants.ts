export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
export const CART_SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS';
export const CART_SAVE_PAYMENT_METHOD = 'CART_SAVE_PAYMENT_METHOD';
export const CART_EMPTY = 'CART_EMPTY';


export interface ShippingItem{
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}


export interface CartItem {
  name: string;
  image: string;
  price: number;
  countInStock: number;
  product: string;
  qty:number;
  
}

export interface CartItemState {
  totalPrice: number;
  taxPrice: number;
  shippingPrice: number;
  itemsPrice: number;
  paymentMethod:string;
  cartItems: CartItem[];
  shippingAddress:ShippingItem;
}