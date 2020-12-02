import Axios from 'axios';
import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RegisterActionTypes, SigninActionTypes } from '../constants/userConstants';
import { ApplicationState } from '../store';


export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;



export const signin = (email:string, password:string):
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch) => {


  dispatch({ type: SigninActionTypes.USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/users/signin', { email, password });
    dispatch({ type: SigninActionTypes.USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SigninActionTypes.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const register = (name:string, email:string, password:string):
ThunkAction<void, ApplicationState, null, Action<string>> => async (dispatch) => {
  dispatch({ type: RegisterActionTypes.USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/users/register', {
      name,
      email,
      password,
    });
    dispatch({ type: RegisterActionTypes.USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: SigninActionTypes.USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: RegisterActionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const signout = ():
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: SigninActionTypes.USER_SIGNOUT });
};

