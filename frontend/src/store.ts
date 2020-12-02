import { Store, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import { productListReducer } from './reducers/productReducers';
//import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductDetailsState, ProductState } from './constants/productConstants';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { History } from "history";
import { connectRouter, routerMiddleware, RouterState } from "connected-react-router";
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers';
import { CartItemState } from './constants/cartConstants';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';
import { RegisterState, SigninState } from './constants/userConstants';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';
import { OrderDetailState, OrderState } from './constants/orderConstants';



export interface ApplicationState {
  router: RouterState;
  productList: ProductState;
  productDetails: ProductDetailsState;
  cart: CartItemState;
  userSignin: SigninState;
  userRegister: RegisterState;
  orderCreate: OrderState,
  orderDetails:OrderDetailState,
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
  });

const initialState: ApplicationState |any = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo') || '{}')
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems') || '{}')
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress') || '{}')
      : {},
    paymentMethod: 'PayPal',
  },

}

export default function configureStore(history: History): Store<ApplicationState> {
  const store = createStore(
    createRootReducer(history),
    initialState,
    //composeWithDevTools(applyMiddleware( thunk))
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
  );
  return store;
}
