import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";

class Dashboard extends Component {
  async componentDidMount() {
    this.props.getSecret();
  }
  render() {
    return (
      <div>
        This is the dahsboard <br />
        Our Secret :<h3>{this.props.secret}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    secret: state.dash.secret
  };
};

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
