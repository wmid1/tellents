import React, { Component } from 'react';
import Header from '../components/Header';
import '../styles/landing-styles.css';

class Skills extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    // const username = this.state.value;
    this.setState({ value: '' });
  };

  render() {
    return (
      <div className="startWindow">
        <Header />
        <h2>This page is Skills</h2>
        <input
          className="form-control rounded mb-1 mt-3"
          type="text"
          name="user"
          pattern=".{3,}"
          required
          placeholder="Your name"
          value={this.state.username}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Skills;
