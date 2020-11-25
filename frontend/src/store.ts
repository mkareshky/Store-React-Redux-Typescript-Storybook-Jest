import { Store,createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import { productListReducer } from './reducers/productReducers';
//import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductState } from './constants/productConstants';
import { productListReducer } from './reducers/productReducers';
import { History } from "history";
import { connectRouter, routerMiddleware, RouterState } from "connected-react-router";
import { composeWithDevTools } from 'redux-devtools-extension';

export interface ApplicationState {
  productList: ProductState;
  router: RouterState;
}


  export const createRootReducer = (history: History) =>
  combineReducers({
    productList: productListReducer,
    router: connectRouter(history),
  });



export default function configureStore(
  history: History,
  initialState: ApplicationState
): Store<ApplicationState> {
  const store = createStore(
    createRootReducer(history),
    initialState,
    //composeWithDevTools(applyMiddleware( thunk))
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
  );
  return store;
}
