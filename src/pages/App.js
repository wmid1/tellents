import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authentication, authChange } from '../actions/actions';
import LogInAuth from '../containers/logInPopUp';
import SignInAuth from '../containers/SignInPopUp';
import '../styles/landing-styles.css';

class App extends Component {
  state = {
    value: '',
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

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    this.setState({ value: '' });
  };

  validateToken = () => {
    axios
      .get('https://floating-atoll-63112.herokuapp.com/api/auth/validate_token', { headers: this.props.userReducer })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  logOut = () => {
    this.props.authChange(false);
    axios
      .delete('https://floating-atoll-63112.herokuapp.com/api/auth/sign_out', { headers: this.props.userReducer })
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
      console.log(this.props.userInfo.auth);
      return (
        <div className="startWindow">
          <h2>
            <b>Welcome!</b>
          </h2>
          <LogInAuth modalLogIn={this.state.modalLogIn} modalClose={this.modalClose} />
          <SignInAuth modalSignIn={this.state.modalSignIn} modalClose={this.modalClose} />
          <div className="nav-btns flexbox justify-content-center">
            <a href="Skills" className="item-text">
              Skills
            </a>
            <a href="Search" className="item-text">
              Search
            </a>
            <div className="item-text" onClick={() => this.logOut()}>
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
        <LogInAuth modalLogIn={this.state.modalLogIn} modalClose={this.modalClose} />
        <SignInAuth modalSignIn={this.state.modalSignIn} modalClose={this.modalClose} />

        <div className="nav-btns flexbox justify-content-center">
          <button className="register-btn btn btn-bg-transparent btn-with-icon">
            <span className="button-content" onClick={() => this.modalSignIn(true)}>
              <span className="icon icon-plus-button blue-color" />
              <b>Register</b>
            </span>
          </button>
          <button className="login-btn btn btn-bg-transparent btn-with-icon" onClick={() => this.modalLogIn(true)}>
            <span className="button-content">
              <span className="icon icon-user2 blue-color" />
              <b>Login</b>
            </span>
          </button>
        </div>
        {this.state.value !== '' && (
          <button className="btn btn-secondary mt-2 " onClick={this.handleSubmit}>
            <b>Log In</b>
          </button>
        )}
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

App.propTypes = {
  userReducer: PropTypes.object,
  userInfo: PropTypes.object,
  authentication: PropTypes.func,
  authChange: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
