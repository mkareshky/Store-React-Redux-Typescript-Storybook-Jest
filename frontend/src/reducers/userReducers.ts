import { SigninActionTypes, SigninState,Signin, RegisterActionTypes, Register } from "../constants/userConstants";

export const initialState: SigninState={
  userInfo: undefined,
  error: '',
  loading: true
  }


  type Actions =
  |{ type:"USER_SIGNIN_REQUEST",payload:Signin}
  |{ type:"USER_SIGNIN_SUCCESS",payload:Signin}
  |{ type:"USER_SIGNIN_FAIL",payload:string}
  |{ type:"USER_SIGNOUT"}

  
  type ActionsR =
  |{ type:"USER_REGISTER_REQUEST",payload:Register}
  |{ type:"USER_REGISTER_SUCCESS",payload:Register}
  |{ type:"USER_REGISTER_FAIL",payload:string}

  
  
  
  export const userSigninReducer = (state = initialState, action:Actions) => {

    switch (action.type) {
        case SigninActionTypes.USER_SIGNIN_REQUEST:
          return { loading: true };
        case SigninActionTypes.USER_SIGNIN_SUCCESS:
          return { loading: false, userInfo: action.payload };
        case SigninActionTypes.USER_SIGNIN_FAIL:
          return { loading: false, error: action.payload };
        case SigninActionTypes.USER_SIGNOUT:
          return {};
        default:
          return state;
    }
  };
  


  export const userRegisterReducer = (state = initialState, action:ActionsR) => {
    switch (action.type) {
      case RegisterActionTypes.USER_REGISTER_REQUEST:
        return { loading: true };
      case RegisterActionTypes.USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case RegisterActionTypes.USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };