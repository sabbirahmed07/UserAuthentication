import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

class Header extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    console.log("signOut got called");
    this.props.signOut();
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ marginBottom: "30px" }}
      >
        <Link className="navbar-brand" to="/">
          Bishudigital
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dahsboard
              </Link>
            </li>
          </ul>

          <ul className="nav narbar-nav ml-auto">
            {!this.props.isAuth ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
                ,
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                </li>
              </>
            ) : null}

            {this.props.isAuth ? (
              <li className="nav-item">
                <Link className="nav-link" to="/signout" onClick={this.signOut}>
                  Sign Out
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  actions
)(Header);
