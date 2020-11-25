import { ProductState,ProductActionTypes, ProductDetailsActionTypes, ProductDetailsState } from "../constants/productConstants";
import {  Reducer } from "redux";

export const initialState: ProductState={
  data: [],
  errors: '',
  loading: true
  }
export const initialStated: ProductDetailsState={
  product: undefined,
  error: '',
  loading: true
  }


  export const productListReducer: Reducer<ProductState> = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case ProductActionTypes.PRODUCT_LIST_REQUEST:
        return {  ...state,loading: true };
      case ProductActionTypes.PRODUCT_LIST_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case ProductActionTypes.PRODUCT_LIST_FAIL:
        return { ...state, loading: false, errors: action.payload };
      default:
        return state;
    }
  };
  export const productDetailsReducer: Reducer<ProductDetailsState> = (
    state = initialStated,
    action
  ) => {
    switch (action.type) {
      case ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST:
        return {  ...state,loading: true };
      case ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS:
        return {  ...state,loading: false, product: action.payload };
      case ProductDetailsActionTypes.PRODUCT_DETAILS_FAIL:
        return {  ...state,loading: false, error: action.payload };
      default:
        return state;
    }
  };


  


  



