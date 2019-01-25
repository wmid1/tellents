import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import ClickOutHandler from 'react-onclickout';
import { authentication, authChange } from '../actions/actions';
import { logOut, validation } from '../api';
import '../styles/header.css';

class Header extends Component {
  static propTypes = {
    userReducer: PropTypes.object,
    userInfo: PropTypes.object,
    authentication: PropTypes.func,
    authChange: PropTypes.func.isRequired,
  };

  state = {
    dropdownOpen: false,
    linkDownOpen: false,
  };

  viewDropdown = () => {
    this.setState({ dropdownOpen: true });
  };

  viewLinkDown = () => {
    this.setState({ linkDownOpen: true });
  };

  closeLinkDown = () => {
    this.setState({ linkDownOpen: false });
  };

  closeDropdown = () => {
    this.setState({ dropdownOpen: false });
  };

  logExit = () => {
    this.props.authChange(false);
    logOut().then(() => {
      this.props.authentication({});
    });
    localStorage.clear();
  };

  validateToken = () => {
    validation()
      .then(response => {
        this.props.authentication(response.headers);
      })
      .catch(() => {
        toastr.error('Authorized users only.');
      });
  };

  componentDidMount() {
    if (localStorage.getItem('auth')) {
      this.validateToken();
    }
  }

  render() {
    const { dropdownOpen, linkDownOpen } = this.state;
    const { viewDropdown, viewLinkDown, closeDropdown, closeLinkDown, logExit } = this;
    const userBox = (
      <div className="user-box">
        <div className="notifications">
          <div className="notifications-icon" />
        </div>
        <img className="user-photo" src={localStorage.getItem('user_avatar_url')} alt="user_avatar" />
        <div className="user-box-nav dropdown">
          <Link to="#" className="dropdown-toggle" data-offset="50" onClick={viewDropdown}>
            <div className="new-box">
              {localStorage.getItem('full_name')}
              <span className="caret" />
            </div>
          </Link>
          {dropdownOpen && (
            <ClickOutHandler onClickOut={closeDropdown}>
              <ul className="dropdown-menu-down">
                <li className="items-menu">
                  <Link to="#">Action</Link>
                </li>
                <li className="items-menu">
                  <Link to="#">Another action</Link>
                </li>
                <li className="items-menu">
                  <Link to="#">Something else here</Link>
                </li>
                <li className="items-menu no-border">
                  <Link to="" onClick={logExit}>
                    Log Out
                  </Link>
                </li>
              </ul>
            </ClickOutHandler>
          )}
        </div>
      </div>
    );

    const searchForm = (
      <div className="search-form">
        <form className="my-search-form" role="search">
          <input type="text" className="form-control" placeholder="Search" />
          <div className="search-filter radio-block">
            <div className="radio">
              <input type="radio" name="profile-page-filter" id="jobs-filter" value="jobs-filter" defaultChecked="" />
              <label htmlFor="jobs-filter">
                <span className="radio-text">Jobs</span>
              </label>
            </div>
            <div className="radio">
              <input type="radio" name="profile-page-filter" id="talents-filter" value="talents-filter" />
              <label htmlFor="talents-filter">
                <span className="radio-text">Talents</span>
              </label>
            </div>
            <Link to="" type="submit" className="btn-search">
              <i className="icon-loupe" />
            </Link>
          </div>
        </form>
      </div>
    );
    const navList = (
      <div className="nav-list">
        <ul className="flexbox justify-space-between">
          <li>
            <NavLink exact to="" className="item-text" activeClassName="nav-selected">
              <div className="caret" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Skills" className="item-text" activeClassName="nav-selected">
              <div className="caret" />
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink to="/Search" className="item-text" activeClassName="nav-selected">
              <div className="caret" />
              Search
            </NavLink>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="main-top-nav flexbox justify-space-between">
        <div className="logo">
          <img src="images/logo.png" alt="logo" height="39" width="auto" />
        </div>
        <div type="button" className="humburger-icon">
          <button type="button" className="btn btn-bg-transparent" onClick={viewLinkDown}>
            <span className="icon icon-menu" />
          </button>
        </div>
        {linkDownOpen && (
          <ClickOutHandler onClickOut={closeLinkDown}>
            <section className="nav-tablet-down justify-space-between">
              <div className="user-box-down">{userBox}</div>
              {searchForm}
              <div className="nav-list">
                <ul className="flexbox justify-space-between">
                  <li>
                    <NavLink exact to="" className="item-text" activeClassName="nav-selected">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Skills" className="item-text" activeClassName="nav-selected">
                      Skills
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Search" className="item-text" activeClassName="nav-selected">
                      Search
                    </NavLink>
                  </li>
                </ul>
              </div>
            </section>
          </ClickOutHandler>
        )}
        <section className="nav-mobile flexbox justify-space-between">
          <section className="nav-tablet flexbox justify-space-center">
            {searchForm}
            {navList}
          </section>
          {userBox}
        </section>
      </nav>
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
