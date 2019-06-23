import * as actionTypes from "../actions/types";

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: "",
  errorMessage: ""
};

export default (state = DEFAULT_STATE, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case actionTypes.AUTH_SIGN_UP:
      console.log("[AuthReducer got an AUTH_SIGN_UP action!]");
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errorMessage: ""
      };
    case actionTypes.AUTH_SIGN_IN:
      console.log("[AuthReducer got an AUTH_SIGN_IN action!]");
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errorMessage: ""
      };
    case actionTypes.AUTH_SIGN_OUT:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: false,
        errorMessage: ""
      };
    case actionTypes.AUTH_ERROR:
      console.log("[AuthReducer got an AUTH_ERROR action!]");
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
