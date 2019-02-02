import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { authentication, authChange } from '../../actions/actions';
import { logOut } from '../../api';
import '../../styles/header.css';

class DropdownUserLinks extends Component {
  static propTypes = {
    userReducer: PropTypes.object,
    authentication: PropTypes.func,
    authChanges: PropTypes.func.isRequired,
    closeDropdown: PropTypes.func,
  };

  logExit = () => {
    this.props.authChanges(false);
    logOut().then(() => {
      this.props.authentication({});
    });
    localStorage.clear();
  };

  handleClickOutside = () => {
    this.props.closeDropdown();
  };

  render() {
    return (
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
          <Link to="" onClick={this.logExit}>
            Log Out
          </Link>
        </li>
      </ul>
    );
  }
}
function mapStateToProps(store) {
  return {
    userInfo: store.userInfo,
  };
}
const mapDispatchToProps = dispatch => ({
  authChanges: auth => dispatch(authChange(auth)),
  authentication: headers => dispatch(authentication(headers)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(onClickOutside(DropdownUserLinks));
