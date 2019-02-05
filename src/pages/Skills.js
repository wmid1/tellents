/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Header from '../components/header/Header';
import SkillBox from '../components/skillBox/SkillBox';
import SkillLinks from '../components/skillBox/SkillLinks';
import '../styles/styles.css';

class Skills extends Component {
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
                    <SkillLinks />
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
