import { ProductActionTypes, ProductDetailsActionTypes } from '../constants/productConstants';
import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";
import { ApplicationState } from '../store';


export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;


export const listProducts = (): 
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch) => {
	dispatch({
		type: ProductActionTypes.PRODUCT_LIST_REQUEST,
	  });
	  try {
		const { data } = await axios.get('/api/products');
		dispatch({ type: ProductActionTypes.PRODUCT_LIST_SUCCESS, payload: data });
	  } catch (error) {
		dispatch({ type: ProductActionTypes.PRODUCT_LIST_FAIL, payload: error.message });
	  }
 
};


export const detailsProducts = (productId:string): 
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch) => {
		dispatch({
			type: ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST,
			 payload: productId });
		  try {
			const { data } = await axios.get(`/api/products/${productId}`);
			dispatch({ type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS, payload: data });
		  } catch (error) {
			dispatch({ type: ProductDetailsActionTypes.PRODUCT_DETAILS_FAIL, 
				payload:  
				error.response && error.response.data.message
				? error.response.data.message
				: error.message,
			});
		}
	  };