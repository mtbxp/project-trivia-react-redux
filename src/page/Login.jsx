import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };
  }

  validation = () => {
    const { email, name } = this.state;
    return !(email && name);
  }

  handleChange = ({ target }) => {
    const { value, id } = target;
    this.setState({
      [id]: value,
    });
  }

  render() {
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            id="email"
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          Name:
          <input
            data-testid="input-player-name"
            id="name"
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ this.validation() }
        >
          Play
        </button>
      </div>
    );
  }
}
