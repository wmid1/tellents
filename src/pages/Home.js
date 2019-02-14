import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LogInPopUp from '../components/LogInPopUp';
import RegisterPopUp from '../components/RegisterPopUp';
import Header from '../components/header/Header';
import '../styles/landing-styles.css';

class Home extends Component {
  static propTypes = {
    userReducer: PropTypes.object,
    userInfo: PropTypes.object,
  };

  state = {
    isSignInModalOpen: false,
    isSignUpModalOpen: false,
  };

  openSignInModal = () => {
    this.setState({ isSignInModalOpen: true });
  };

  openSignUpModal = () => {
    this.setState({ isSignUpModalOpen: true });
  };

  closeSignUpModal = () => {
    this.setState({ isSignUpModalOpen: false });
  };

  closeSignInModal = () => {
    this.setState({ isSignInModalOpen: false });
  };

  render() {
    if (localStorage.getItem('auth')) {
      return (
        <div className="startWindow">
          <Header />
          <div className="home-window">
            <h2>
              <b>Welcome!</b>
            </h2>
          </div>
        </div>
      );
    }
    return (
      <div className="startWindow">
        <div className="home-window">
          <h2>
            <b>Welcome!</b>
          </h2>
          {this.state.isSignInModalOpen && <LogInPopUp modalClose={this.closeSignInModal} />}
          {this.state.isSignUpModalOpen && <RegisterPopUp modalClose={this.closeSignUpModal} />}
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

export default connect(mapStateToProps)(Home);
