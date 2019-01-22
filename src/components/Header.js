import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authentication, authChange } from '../actions/actions';
import { logOut } from '../api';
import '../styles/landing-styles.css';

class Header extends Component {
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

  logExit = () => {
    this.props.authChange(false);
    logOut().then(() => {
      this.props.authentication({});
    });
    localStorage.clear();
  };

  render() {
    return (
      <div className="nav-btns flexbox justify-content-center">
        <NavLink exact to="" className="item-text" activeClassName="nav-selected">
          Home
        </NavLink>
        <NavLink to="/Skills" className="item-text" activeClassName="nav-selected">
          Skills
        </NavLink>
        <NavLink to="/Search" className="item-text" activeClassName="nav-selected">
          Search
        </NavLink>
        <Link to="" className="item-text" onClick={this.logExit}>
          Log Out
        </Link>
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
)(Header);
