import { ProductState,ProductActionTypes } from "../constants/productConstants";
import {  Reducer } from "redux";

export const initialState: ProductState={
  data: [],
  errors: '',
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



  


  



