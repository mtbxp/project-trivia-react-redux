import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import saveLoginAction from '../redux/actions';

class Login extends Component {
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

  fetchApi = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
  }

  handleClick = async () => {
    const { history, saveLogin } = this.props;
    saveLogin(this.state);
    await this.fetchApi();
    history.push('/game');
  }

  handleChange = ({ target }) => {
    const { value, id } = target;
    this.setState({
      [id]: value,
    });
  }

  render() {
    const { history } = this.props;
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
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (state) => dispatch(saveLoginAction(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
