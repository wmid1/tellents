import React, { Component } from 'react';
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
        <h2>
          <b>Skills!</b>
        </h2>

        <div className="nav-btns flexbox justify-content-center">
          <a href="./" className="item-text">
            Start Page
          </a>
          <a href="Search" className="item-text">
            Search
          </a>
        </div>

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
        {this.state.value !== '' && (
          <button className="btn btn-secondary mt-2 " onClick={this.handleSubmit}>
            <b>Log In</b>
          </button>
        )}
      </div>
    );
  }
}

export default Skills;
