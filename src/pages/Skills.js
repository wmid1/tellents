import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import SkillBox from '../components/SkillBox';
import '../styles/styles.css';

class Skills extends Component {
  state = {
    value: '',
    currentWindow: 'skills',
  };

  setWindow = currentWindow => {
    this.setState({ currentWindow });
  };

  render() {
    return (
      <div className="startWindow">
        <Header />
        <div className="content">
          <div className="container-fluid">
            <div className="panel panel-default my-main-panel">
              <div className="panel-body">
                <div className="flexbox">
                  <div className="right-col">
                    <ul className="nav nav-pills nav-stacked my-sidebar" role="tablist">
                      <li className={this.state.currentWindow === 'overview' ? 'active' : ''}>
                        <Link to="#" onClick={() => this.setWindow('overview')}>
                          <span className="icon icon-overview" />
                          Overview
                        </Link>
                      </li>
                      <li className={this.state.currentWindow === 'messages' ? 'active' : ''}>
                        <Link to="#" onClick={() => this.setWindow('messages')}>
                          <span className="icon icon-message" />
                          Messages
                        </Link>
                      </li>
                      <li className={this.state.currentWindow === 'my-jobs' ? 'active' : ''}>
                        <Link to="#" onClick={() => this.setWindow('my-jobs')}>
                          <span className="icon icon-jobs" />
                          My Jobs
                        </Link>
                      </li>
                      <li className={this.state.currentWindow === 'my-promo' ? 'active' : ''}>
                        <Link to="#" onClick={() => this.setWindow('my-promo')}>
                          <span className="icon icon-promo" />
                          My Promo
                        </Link>
                      </li>
                      <li className={this.state.currentWindow === 'skills' ? 'active' : ''}>
                        <Link to="#" onClick={() => this.setWindow('skills')}>
                          <span className="icon icon-skills" />
                          My Skills
                        </Link>
                      </li>
                      <li className={this.state.currentWindow === 'saved' ? 'active' : ''}>
                        <Link to="#" onClick={() => this.setWindow('saved')}>
                          <span className="icon icon-saved" />
                          Saved
                        </Link>
                      </li>
                      <li className={this.state.currentWindow === 'media' ? 'active' : ''}>
                        <Link to="#" onClick={() => this.setWindow('media')}>
                          <span className="icon icon-media" />
                          My Media
                        </Link>
                      </li>
                      <li className={this.state.currentWindow === 'accounts' ? 'active' : ''}>
                        <Link to="#" onClick={() => this.setWindow('accounts')}>
                          <span className="icon icon-accounts" />
                          Accounts
                        </Link>
                      </li>
                      <li className={this.state.currentWindow === 'profile' ? 'active' : ''}>
                        <Link to="#" onClick={() => this.setWindow('profile')}>
                          <span className="icon icon-profile" />
                          Profile
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="left-col">
                    <SkillBox />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
