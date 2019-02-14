import React, { Component } from 'react';
import Header from '../components/header/Header';
import '../styles/landing-styles.css';

class Search extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    this.setState({ value: '' });
  };

  render() {
    return (
      <div className="startWindow">
        <Header />
        <h2>This page is Search</h2>
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
            Log In
          </button>
        )}
      </div>
    );
  }
}

export default Search;
