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
    authentications: PropTypes.func.isRequired,
    authChanges: PropTypes.func.isRequired,
    fetchSignIn: PropTypes.func,
    modalClose: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    disabled: false,
    passwordValid: true,
    emailValid: true,
  };

  postLogInForm = event => {
    event.preventDefault();
    this.setState({ disabled: true });
    const {
      props: { modalClose, authChanges, authentications },
      state: { email, password },
    } = this;
    if (email.length > 3 && password.length > 7) {
      fetchSignIn(email, password)
        .then(response => {
          authentications(response.headers);
          authChanges(true);
          localStorage.setItem('access-token', response.headers['access-token']);
          localStorage.setItem('expiry', response.headers.expiry);
          localStorage.setItem('token-type', response.headers['token-type']);
          localStorage.setItem('client', response.headers.client);
          localStorage.setItem('uid', response.headers.uid);
          localStorage.setItem('full_name', response.data.data.full_name);
          localStorage.setItem('user_avatar_url', response.data.data.image.url);
          localStorage.setItem('auth', true);
          modalClose();
        })
        .catch(error => {
          toastr.error(error.response.data.errors[0]);
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
      if (event.target.value === '') {
        this.setState({ [`${name}Valid`]: false });
      }
      if (event.target.value !== '') {
        this.setState({ [`${name}Valid`]: true });
      }
    }
  };

  close = () => {
    this.props.modalClose();
  };

  render() {
    return (
      <div className="popUp justify-content-center">
        <div className="modal-window">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-title">Login Into Your Account</div>
            <div className="modal-form">
              <form onSubmit={this.postLogInForm}>
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
                  <button
                    type="submit"
                    name="commit"
                    disabled={this.state.disabled}
                    className="btn btn-lg btn-primary btn-join"
                  >
                    Log In
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
)(LogInPopUp);
