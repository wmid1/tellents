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
    authentication: PropTypes.func.isRequired,
    authChange: PropTypes.func.isRequired,
    fetchRegister: PropTypes.func,
    modalClose: PropTypes.func.isRequired,
    modalSignIn: PropTypes.bool,
  };

  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    onSubmit: true,
    firstNameValid: true,
    lastNameValid: true,
    passwordValid: true,
    emailValid: true,
  };

  close = () => {
    this.props.modalClose(false);
    this.setState({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      firstNameValid: true,
      lastNameValid: true,
      passwordValid: true,
      emailValid: true,
    });
  };

  postRegisterForm = event => {
    event.preventDefault();
    this.setState({ onSubmit: false });
    const { email, firstName, lastName, password } = this.state;
    if (email.length > 3 && password.length > 7) {
      fetchRegister(firstName, lastName, email, password)
        .then(response => {
          this.props.modalClose(false);
          this.props.authentication(response.headers);
          this.props.authChange(true);
          this.setState({
            onSubmit: true,
            firstNameValid: true,
            lastNameValid: true,
            passwordValid: true,
            emailValid: true,
          });
        })
        .catch(error => {
          toastr.error('Email already in use');
          this.setState({ onSubmit: true });
          console.log(error);
        });
    }
  };

  waitSubmitForm = event => {
    event.preventDefault();
    toastr.info('Waiting to submit the form.');
  };

  handleInputChange = event => {
    const nameInput = event.target.name;
    this.setState({ [nameInput]: event.target.value });
    if (event.target.name === 'password') {
      if (event.target.value.length < 8) {
        this.setState({ passwordValid: false });
      } else {
        this.setState({ passwordValid: true });
      }
    } else {
      if (event.target.value === '') {
        this.setState({ [`${nameInput}Valid`]: false });
      }
      if (event.target.value !== '') {
        this.setState({ [`${nameInput}Valid`]: true });
      }
    }
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
                <form onSubmit={this.state.onSubmit ? this.postRegisterForm : this.waitSubmitForm}>
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
                    <input
                      type="submit"
                      value="➡ START NOW"
                      ng-click="$ctrl.login(sessionsForm)"
                      className="btn btn-lg btn-primary login"
                    />
                  </div>
                </form>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterPopUp);
