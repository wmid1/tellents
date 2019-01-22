import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { authentication, authChange } from '../actions/actions';
import { validation, logOut } from '../api';
import LogInPopUp from '../components/logInPopUp';
import RegisterPopUp from '../components/RegisterPopUp';
import Header from '../components/Header';
import '../styles/landing-styles.css';

class Home extends Component {
  static propTypes = {
    userReducer: PropTypes.object,
    userInfo: PropTypes.object,
    authentication: PropTypes.func,
    authChange: PropTypes.func.isRequired,
  };

  state = {
    isSignInModalOpen: false,
    isSignUpModalOpen: false,
    update: false,
  };

  openSignInModal = () => {
    this.setState({ isSignInModalOpen: true });
  };

  openSignUpModal = () => {
    this.setState({ isSignUpModalOpen: true });
  };

  closeModalSignUp = () => {
    this.setState({ isSignUpModalOpen: false });
  };

  closeModalSignIn = () => {
    this.setState({ isSignInModalOpen: false });
  };

  validateToken = () => {
    validation().catch(() => {
      toastr.error('Authorized users only.');
    });
  };

  logExit = () => {
    this.props.authChange(false);
    logOut().then(() => {
      this.props.authentication({});
    });
    localStorage.clear();
  };

  componentDidMount() {
    if (localStorage.getItem('auth')) {
      this.validateToken();
    }
  }

  render() {
    if (localStorage.getItem('auth')) {
      return (
        <div className="startWindow">
          <Header />
          <h2>
            <b>Welcome!</b>
          </h2>
        </div>
      );
    }
    return (
      <div className="startWindow">
        <h2>
          <b>Welcome!</b>
        </h2>
        {this.state.isSignInModalOpen && <LogInPopUp modalClose={this.closeModalSignIn} />}
        {this.state.isSignUpModalOpen && <RegisterPopUp modalClose={this.closeModalSignUp} />}
        <div className="nav-btns flexbox justify-content-center">
          <button className="register-btn btn btn-bg-transparent btn-with-icon" type="button">
            <span className="button-content" onClick={this.openSignUpModal}>
              <span className="icon icon-plus-button blue-color" />
              <b>Register</b>
            </span>
          </button>
          <button
            className="login-btn btn btn-bg-transparent btn-with-icon"
            type="button"
            onClick={this.openSignInModal}
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
)(Home);
