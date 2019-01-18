import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authentication, authChange } from '../actions/actions';
import '../styles/home-styles.css';

class SignInAuth extends Component {
  state = {
    value: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  };

  close = () => {
    this.props.modalClose(false);
    this.setState({ value: '', email: '', first_name: '', last_name: '', password: '' });
  };

  axiosPost = () => {
    if (this.state.email.length > 3 && this.state.password.length > 7) {
      axios
        .post('https://floating-atoll-63112.herokuapp.com/api/auth', {
          email: this.state.email,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
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

  fName = event => {
    this.setState({ first_name: event.target.value });
  };

  lName = event => {
    this.setState({ last_name: event.target.value });
  };

  passSend = event => {
    this.setState({ password: event.target.value });
  };

  emailSend = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    const { modalSignIn } = this.props;

    if (modalSignIn) {
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
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-title blue-color">Please Sign Up</div>
              <div className="modal-text">Join over 2 million tallents already using Tellents. Start now for free!</div>
              <div className="modal-form">
                <div>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      required
                      onChange={this.fName}
                    />
                    <span className="error-message">Please enter your First Name</span>
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      required
                      onChange={this.lName}
                    />
                    <span className="error-message">Right Name</span>
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      className="form-control dity"
                      placeholder="Email"
                      required
                      onChange={this.emailSend}
                    />
                    <span className="error-message">Check your email</span>
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      minLength="8"
                      onChange={this.passSend}
                    />
                    <span className="error-message">Too short. Use at least 8 characters</span>
                  </div>
                  <button className="btn btn-blue btn-with-icon">
                    <span className="button-content" onClick={this.axiosPost}>
                      <span className="icon icon-right-arrow" />
                      START NOW
                    </span>
                  </button>
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

SignInAuth.propTypes = {
  userReducer: PropTypes.object,
  authentication: PropTypes.func.isRequired,
  authChange: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
  modalSignIn: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInAuth);
