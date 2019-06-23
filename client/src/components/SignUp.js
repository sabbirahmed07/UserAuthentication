import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import CustomInput from "./CustomInput";

import * as actions from "../actions";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }
  async onSubmit(formData) {
    console.log("onSubmit was called");
    console.log("formData", formData);
    //We need to call some action creators
    await this.props.signUp(formData);

    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }

  async responseGoogle(res) {
    console.log("responseGoogle", res);
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }

  async responseFacebook(res) {
    console.log("responseFacebook", res);
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter your email"
                placeholder="example@example.com"
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                label="Enter your passowrd"
                placeholder="yourpassword"
                component={CustomInput}
              />
            </fieldset>

            {this.props.errorMessage ? (
              <div className="alert alert-danger">
                {this.props.errorMessage}
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>

        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">
              Or sign up using third-party services
            </div>
            <FacebookLogin
              appId="2335689480003445"
              //autoLoad={false}
              textButton="Facebook"
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="btn btn-outline-primary"
            />
            <GoogleLogin
              className="btn btn-outline-danger"
              clientId="652887277476-0jsppqjbfh09eudp4frctd7noq8so9nr.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signup" })
)(SignUp);
