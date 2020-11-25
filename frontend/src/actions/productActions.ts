import { ProductActionTypes, ProductDetailsActionTypes } from '../constants/productConstants';
import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import axios, { AxiosError } from "axios";
import { ApplicationState } from '../store';


export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;





export const listProducts = (): 
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch) => {
   
  await	axios
		.get('/api/products')
		.then((data) => {
			console.log(data)
			dispatch({
                type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
                payload:{ data}
			});
		})
		.catch((error: AxiosError) => {
			dispatch({
        type: ProductActionTypes.PRODUCT_LIST_FAIL,
        payload: `Error: ${error.response}`
			});
		})
};


export const detailsProducts = (productId:string): 
ThunkAction<void, ApplicationState, null, Action<string>> => async(dispatch) => {
   
  await	axios
		.get('/api/products')
		.then((data) => {
			console.log(data)
			dispatch({
                type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS,
                payload:{ data}
			});
		})
		.catch((error: AxiosError) => {
			dispatch({
        type: ProductDetailsActionTypes.PRODUCT_DETAILS_FAIL,
        payload: `Error: ${error.response}`
			});
		})
};
