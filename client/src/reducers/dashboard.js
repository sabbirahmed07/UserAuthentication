import * as actionTypes from "../actions/types";

const DEFAULT_STATE = {
  secret: ""
};

export default (state = DEFAULT_STATE, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case actionTypes.DASHBOARD_GET_DATA:
      return {
        ...state,
        secret: action.payload
      };

    default:
      return state;
  }
};
