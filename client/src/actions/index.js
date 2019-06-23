import axios from "axios";
import * as actionTypes from "./types";
/*
action creators -> create/return actions({ }) -> dispathed -> middlewares -> reducers
*/

export const oauthGoogle = data => {
  return async dispatch => {
    console.log("we recieved", data);
    const res = await axios.post("http://localhost:5000/users/oauth/google", {
      access_token: data
    });

    dispatch({
      type: actionTypes.AUTH_SIGN_UP,
      payload: res.data.token
    });
    localStorage.setItem("JWT_TOKEN", res.data.token);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  };
};

export const oauthFacebook = data => {
  return async dispatch => {
    console.log("we recieved", data);
    const res = await axios.post("http://localhost:5000/users/oauth/facebook", {
      access_token: data
    });

    dispatch({
      type: actionTypes.AUTH_SIGN_UP,
      payload: res.data.token
    });
    localStorage.setItem("JWT_TOKEN", res.data.token);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  };
};

export const signUp = data => {
  /*
      step 1) use the data and to make HTTP request to our backend and send it along [x]
      step 2) take the backend's response (jwtToken is here now) [x]
      step 3) Dispatch user just signed uo (with jwtToken) [x]
      step 4) save the jwtToken into our localStorage [x]
    */
  return async dispatch => {
    try {
      console.log("[ActionCreator signUp called!]");
      const res = await axios.post("http://localhost:5000/users/signup", data);
      console.log("res", res);
      console.log("[ActionCreator signUp dispatched an action!]");
      dispatch({
        type: actionTypes.AUTH_SIGN_UP,
        payload: res.data.token
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (err) {
      dispatch({
        type: actionTypes.AUTH_ERROR,
        payload: "Email is already in use"
      });
      console.log("error", err);
    }
  };
};

export const signIn = data => {
  /*
      step 1) use the data and to make HTTP request to our backend and send it along [x]
      step 2) take the backend's response (jwtToken is here now) [x]
      step 3) Dispatch user just signed uo (with jwtToken) [x]
      step 4) save the jwtToken into our localStorage [x]
    */
  return async dispatch => {
    try {
      console.log("[ActionCreator signIn called!]");
      const res = await axios.post("http://localhost:5000/users/signin", data);
      console.log("res", res);
      console.log("[ActionCreator signUp dispatched an action!]");
      dispatch({
        type: actionTypes.AUTH_SIGN_IN,
        payload: res.data.token
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (err) {
      dispatch({
        type: actionTypes.AUTH_ERROR,
        payload: "Email and password combination isn't valid"
      });
      console.log("error", err);
    }
  };
};

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem("JWT_TOKEN");
    axios.defaults.headers.common["Authorization"] = "";
    dispatch({
      type: actionTypes.AUTH_SIGN_OUT,
      payload: ""
    });
  };
};

export const getSecret = () => {
  return async dispatch => {
    try {
      console.log("[ActionCreator] trying to get BE's secret");
      const res = await axios.get("http://localhost:5000/users/secret");
      console.log("res", res);

      dispatch({
        type: actionTypes.DASHBOARD_GET_DATA,
        payload: res.data.secret
      });
    } catch (err) {
      console.error("err", err);
    }
  };
};
