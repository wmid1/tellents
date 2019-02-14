import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import '../../styles/header.css';

class DropdownNavLinks extends Component {
  static propTypes = {
    closeLinkDown: PropTypes.func,
    userBox: PropTypes.object,
    searchForm: PropTypes.object,
  };

  handleClickOutside = () => {
    this.props.closeLinkDown();
  };

  render() {
    const { userBox, searchForm } = this.props;
    return (
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
    );
  }
}

export default onClickOutside(DropdownNavLinks);
