import Axios from 'axios';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, ShippingItem } from '../constants/cartConstants';
import { ApplicationState } from '../store';


export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;



export const addToCart = (productId:string='0', qty:number):
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch, getState) => {

  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId:string):
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data:ShippingItem):
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data:string):
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};