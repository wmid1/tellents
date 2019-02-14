import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../styles/styles.css';

class SkillLinks extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
  };

  state = {
    value: '',
    currentWindow: 'skills',
  };

  setWindow = currentWindow => {
    this.setState({ currentWindow });
  };

  render() {
    return (
      <ul className="nav nav-pills nav-stacked my-sidebar" role="tablist">
        {this.props.userInfo.links.map(link => (
          <li key={link} className={this.state.currentWindow === link ? 'active' : ''}>
            <Link to="#" onClick={() => this.setWindow(link)}>
              <span className={`icon icon-${link}`} />
              {link}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(store) {
  return {
    userInfo: store.userInfo,
  };
}

export default connect(mapStateToProps)(SkillLinks);
