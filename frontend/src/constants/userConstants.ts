export interface Signin {
    email: string;
    password: string;
    name:string;
    token:string;
  }
export interface Register {
    email: string;
    password: string;
    name:string;
    _id: string;
    isAdmin: boolean;
    token: string;
  }

  
  export enum SigninActionTypes {
     USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST',
     USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS',
     USER_SIGNIN_FAIL = 'USER_SIGNIN_FAIL',
     USER_SIGNOUT = 'USER_SIGNOUT',
  }
  export enum RegisterActionTypes {
     USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST',
     USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
     USER_REGISTER_FAIL = 'USER_REGISTER_FAIL',
   
  }
  
  export interface SigninState {
    readonly loading: boolean;
    readonly userInfo: Signin|undefined;
    readonly error: string|undefined;
  }
  export interface RegisterState {
    readonly loading: boolean;
    readonly userInfo: Register|undefined;
    readonly error: string|undefined;
  }



