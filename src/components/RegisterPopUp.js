import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { authentication, authChange } from '../actions/actions';
import { fetchRegister } from '../api';
import '../styles/home-styles.css';

class RegisterPopUp extends Component {
  static propTypes = {
    userReducer: PropTypes.object,
    authentications: PropTypes.func.isRequired,
    authChanges: PropTypes.func.isRequired,
    fetchRegister: PropTypes.func,
    modalClose: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    disabled: false,
    firstNameValid: true,
    lastNameValid: true,
    passwordValid: true,
    emailValid: true,
  };

  close = () => {
    this.props.modalClose(false);
  };

  postRegisterForm = event => {
    event.preventDefault();
    this.setState({ disabled: true });
    const {
      props: { modalClose, authentications, authChanges },
      state: { email, firstName, lastName, password },
    } = this;
    if (email.length > 3 && password.length > 7) {
      fetchRegister(firstName, lastName, email, password)
        .then(response => {
          authentications(response.headers);
          authChanges(true);
          localStorage.setItem('access-token', response.headers['access-token']);
          localStorage.setItem('expiry', response.headers.expiry);
          localStorage.setItem('token-type', response.headers['token-type']);
          localStorage.setItem('uid', response.headers.uid);
          localStorage.setItem('client', response.headers.client);
          localStorage.setItem('full_name', response.data.data.full_name);
          localStorage.setItem('user_avatar_url', response.data.data.image.url);
          localStorage.setItem('auth', true);
          modalClose();
        })
        .catch(error => {
          toastr.error(error.response.data.errors.full_messages[0]);
          this.setState({ disabled: false });
        });
    }
  };

  handleInputChange = event => {
    const {
      target: { value, name },
    } = event;
    this.setState({ [name]: value });
    if (name === 'password') {
      this.setState({ passwordValid: value.length > 7 });
    } else {
      if (value === '') {
        this.setState({ [`${name}Valid`]: false });
      }
      if (value !== '') {
        this.setState({ [`${name}Valid`]: true });
      }
    }
  };

  render() {
    return (
      <div className="popUp justify-content-center">
        <div className="modal-window">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.close}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-title blue-color">Please Sign Up</div>
            <div className="modal-text">Join over 2 million tallents already using Tellents. Start now for free!</div>
            <div className="modal-form">
              <form onSubmit={this.postRegisterForm}>
                <div className="input-wrapper">
                  <input
                    type="text"
                    className={this.state.firstNameValid ? 'form-control' : 'invalid'}
                    name="firstName"
                    placeholder="First Name"
                    required
                    onChange={this.handleInputChange}
                  />
                  <span className="error-message">Please enter your First Name</span>
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    className={this.state.lastNameValid ? 'form-control' : 'invalid'}
                    name="lastName"
                    placeholder="Last Name"
                    required
                    onChange={this.handleInputChange}
                  />
                  <span className="error-message">Right Name</span>
                </div>
                <div className="input-wrapper">
                  <input
                    type="email"
                    className={this.state.emailValid ? 'form-control' : 'invalid'}
                    name="email"
                    placeholder="Email"
                    required
                    onChange={this.handleInputChange}
                  />
                  <span className="error-message">Check your email</span>
                </div>
                <div className="input-wrapper">
                  <input
                    type="password"
                    className={this.state.passwordValid ? 'form-control' : 'invalid'}
                    name="password"
                    placeholder="Password"
                    required
                    minLength="8"
                    onChange={this.handleInputChange}
                  />
                  <span className="error-message">Too short. Use at least 8 characters</span>
                </div>
                <div className="form-group">
                  <button type="submit" disabled={this.state.disabled} className="btn btn-lg btn-primary btn-join">
                    ➡ START NOW
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(store) {
  return {
    userReducer: store.userReducer,
  };
}
const mapDispatchToProps = dispatch => ({
  authentications: headers => dispatch(authentication(headers)),
  authChanges: auth => dispatch(authChange(auth)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterPopUp);
