import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authentication, authChange } from '../actions/actions';
import '../styles/home-styles.css';

class LogInAuth extends Component {
  state = {
    value: '',
    email: '',
    password: '',
  };

  axiosPost = () => {
    if (this.state.email.length > 3 && this.state.password.length > 7) {
      axios
        .post('https://floating-atoll-63112.herokuapp.com/api/auth/sign_in', {
          email: this.state.email,
          password: this.state.password,
        })
        .then(response => {
          console.log(response);
          this.setState({
            headers: response.headers,
            access_token: response.headers.access_token,
            client: response.headers.client,
          });
          this.props.modalClose(false);
          this.props.authentication(response.headers);
          this.props.authChange(true);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  passSend = event => {
    this.setState({ password: event.target.value });
  };

  emailSend = event => {
    this.setState({ email: event.target.value });
  };

  close = () => {
    this.props.modalClose(false);
    this.setState({ value: '', email: '', password: '' });
  };

  render() {
    const { modalLogIn } = this.props;

    if (modalLogIn) {
      return (
        <div className="popUp justify-content-center">
          <div className="modal-window">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.close()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-title">Login Into Your Account</div>
              <div className="modal-form">
                <div>
                  <div className="input-wrapper">
                    <input
                      autoFocus="autofocus"
                      ng-model="$ctrl.user.email"
                      id="user_email"
                      type="email"
                      className="form-control dity"
                      placeholder="Email"
                      onChange={this.emailSend}
                      required
                    />
                    <span className="error-message">Check your email</span>
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      onChange={this.passSend}
                      className="form-control"
                      placeholder="Password"
                      required
                      minLength="8"
                    />
                    <span className="error-message">Too short. Use at least 8 characters</span>
                  </div>
                  <div className="form-group" onClick={this.axiosPost}>
                    <input
                      type="submit"
                      name="commit"
                      value="Log In"
                      ng-click="$ctrl.login(sessionsForm)"
                      className="btn btn-lg btn-primary login"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}
function mapStateToProps(store) {
  return {
    userReducer: store.userReducer,
  };
}
const mapDispatchToProps = dispatch => ({
  authentication: headers => dispatch(authentication(headers)),
  authChange: auth => dispatch(authChange(auth)),
});

LogInAuth.propTypes = {
  userReducer: PropTypes.object,
  authentication: PropTypes.func.isRequired,
  authChange: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
  modalLogIn: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInAuth);
