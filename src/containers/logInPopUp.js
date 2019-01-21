import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { fetchSignIn } from '../api';
import { authentication, authChange } from '../actions/actions';
import '../styles/home-styles.css';

class LogInPopUp extends Component {
  static propTypes = {
    userReducer: PropTypes.object,
    authentication: PropTypes.func.isRequired,
    authChange: PropTypes.func.isRequired,
    fetchSignIn: PropTypes.func,
    modalClose: PropTypes.func.isRequired,
    modalLogIn: PropTypes.bool,
  };

  state = {
    email: '',
    password: '',
    onSubmit: true,
    passwordValid: true,
    emailValid: true,
  };

  postLogInForm = event => {
    event.preventDefault();
    this.setState({ onSubmit: false });
    const { email, password } = this.state;

    if (email.length > 3 && password.length > 7) {
      fetchSignIn(email, password)
        .then(response => {
          this.props.modalClose(false);
          this.props.authentication(response.headers);
          this.props.authChange(true);
          this.setState({ onSubmit: true, passwordValid: true, emailValid: true });
        })
        .catch(() => {
          toastr.error('Invalid login credentials. Please try again.');
          this.setState({ onSubmit: true });
        });
    }
  };

  waitSubmitForm = event => {
    event.preventDefault();
    toastr.info('Waiting to submit the form.');
  };

  handleInputChange = event => {
    const {
      target: { value, name },
    } = event;
    this.setState({ [name]: value });
    if (name === 'password') {
      if (value.length < 8) {
        this.setState({ passwordValid: false });
      } else {
        this.setState({ passwordValid: true });
      }
    } else {
      if (event.target.value === '') {
        this.setState({ [`${name}Valid`]: false });
      }
      if (event.target.value !== '') {
        this.setState({ [`${name}Valid`]: true });
      }
    }
  };

  close = () => {
    this.props.modalClose(false);
    this.setState({ email: '', password: '', passwordValid: true, emailValid: true });
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
                <form onSubmit={this.state.onSubmit ? this.postLogInForm : this.waitSubmitForm}>
                  <div className="input-wrapper">
                    <input
                      autoFocus="autofocus"
                      id="user_email"
                      type="email"
                      className={this.state.emailValid ? 'form-control' : 'invalid'}
                      name="email"
                      placeholder="Email"
                      onChange={this.handleInputChange}
                      required
                    />
                    <span className="error-message">Check your email</span>
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      name="password"
                      onChange={this.handleInputChange}
                      className={this.state.passwordValid ? 'form-control' : 'invalid'}
                      placeholder="Password"
                      required
                      minLength="8"
                    />
                    <span className="error-message">Too short. Use at least 8 characters</span>
                  </div>
                  <div className="form-group">
                    <input type="submit" name="commit" value="Log In" className="btn btn-lg btn-primary login" />
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
)(LogInPopUp);
