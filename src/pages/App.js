import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { authentication, authChange } from '../actions/actions';
import { validation, logOut } from '../api';
import LogInPopUp from '../containers/logInPopUp';
import RegisterPopUp from '../containers/RegisterPopUp';
import '../../node_modules/toastr/build/toastr.css';
import '../styles/landing-styles.css';

class App extends Component {
  static propTypes = {
    userReducer: PropTypes.object,
    userInfo: PropTypes.object,
    authentication: PropTypes.func,
    authChange: PropTypes.func.isRequired,
  };

  state = {
    modalLogIn: false,
    modalSignIn: false,
  };

  modalLogIn = value => {
    this.setState({ modalLogIn: value });
  };

  modalSignIn = value => {
    this.setState({ modalSignIn: value });
  };

  modalClose = value => {
    this.setState({ modalSignIn: value });
    this.setState({ modalLogIn: value });
  };

  validateToken = () => {
    validation(this.props.userReducer).catch(() => {
      toastr.error('Authorized users only.');
    });
  };

  logExit = () => {
    this.props.authChange(false);
    logOut(this.props.userReducer)
      .then(response => {
        console.log(response);
        this.props.authentication({});
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.props.userInfo.auth) {
      this.validateToken();
      return (
        <div className="startWindow">
          <h2>
            <b>Welcome!</b>
          </h2>
          <LogInPopUp modalLogIn={this.state.modalLogIn} modalClose={this.modalClose} />
          <RegisterPopUp modalSignIn={this.state.modalSignIn} modalClose={this.modalClose} />
          <div className="nav-btns flexbox justify-content-center">
            <a href="Skills" className="item-text">
              Skills
            </a>
            <a href="Search" className="item-text">
              Search
            </a>
            <div className="item-text" onClick={() => this.logExit()}>
              Log Out
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="startWindow">
        <h2>
          <b>Welcome!</b>
        </h2>
        <LogInPopUp modalLogIn={this.state.modalLogIn} modalClose={this.modalClose} />
        <RegisterPopUp modalSignIn={this.state.modalSignIn} modalClose={this.modalClose} />

        <div className="nav-btns flexbox justify-content-center">
          <button className="register-btn btn btn-bg-transparent btn-with-icon" type="button">
            <span className="button-content" onClick={() => this.modalSignIn(true)}>
              <span className="icon icon-plus-button blue-color" />
              <b>Register</b>
            </span>
          </button>
          <button
            className="login-btn btn btn-bg-transparent btn-with-icon"
            type="button"
            onClick={() => this.modalLogIn(true)}
          >
            <span className="button-content">
              <span className="icon icon-user2 blue-color" />
              <b>Login</b>
            </span>
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    userReducer: store.userReducer,
    userInfo: store.userInfo,
  };
}
const mapDispatchToProps = dispatch => ({
  authentication: headers => dispatch(authentication(headers)),
  authChange: auth => dispatch(authChange(auth)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
