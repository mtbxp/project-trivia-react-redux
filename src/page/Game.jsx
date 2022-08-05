import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';

export default class Game extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      currentQuestion: 0,
    };
  }

  componentDidMount() {
    this.validateToken();
  }

  validateToken = async () => {
    const token = localStorage.getItem('token');
    const { history } = this.props;
    const magicNumber = 3;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    if (data.response_code === magicNumber) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ results: data.results });
  }

  handleClick = () => {
    const { currentQuestion } = this.state;
    const magicNumber = 4;
    if (currentQuestion >= magicNumber) {
      this.setState({ currentQuestion: 0 });
    } else {
      this.setState({ currentQuestion: currentQuestion + 1 });
    }
  }

  render() {
    const { results, currentQuestion } = this.state;
    return (
      <div>
        <Header />
        {results.length === 0
          ? 'Loading...'
          : <Question results={ results } currentQuestion={ currentQuestion } />}
        <button type="button" onClick={ this.handleClick }>NEXT</button>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
