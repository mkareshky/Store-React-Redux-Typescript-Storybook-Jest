import Axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { CART_EMPTY } from "../constants/cartConstants";
import {  OrderActionTypes, OrderDetailActionTypes } from "../constants/orderConstants";
import { ApplicationState } from "../store";


export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;


export const createOrder = (order:any):
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch, getState) => {
  dispatch({ type: OrderActionTypes.ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    });
    dispatch({ type: OrderActionTypes.ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const detailsOrder = (orderId:string):
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch, getState) => {
  dispatch({ type: OrderDetailActionTypes.ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: OrderDetailActionTypes.ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: OrderDetailActionTypes.ORDER_DETAILS_FAIL, payload: message });
  }
};