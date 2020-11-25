export interface Product {
    match: any;
    _id: string;
    image: string;
    name: string;
    rating: number;
    numReviews: number;
    price: number;
    countInStock:number;
  }
  
  export enum ProductActionTypes {
    PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST',
    PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS',
    PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL',
  }
  
  export enum ProductDetailsActionTypes {
    PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST',
    PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS',
    PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL',
  }
  
  export interface ProductState {
    readonly loading: boolean;
    readonly data: Product[]|undefined;
    readonly errors?: string;
  }
  
  export interface ProductDetailsState {
    readonly loading: boolean;
    readonly product: Product|undefined;
    readonly error?: string;
  }
  