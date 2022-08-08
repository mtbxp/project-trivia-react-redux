import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import './style.css';

export default class Game extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      currentQuestion: 0,
      timer: 30,
    };
  }

  componentDidMount() {
    this.validateToken();
  }

  componentDidUpdate() {
    this.gameTimer();
  }

  gameTimer = () => {
    const { timer } = this.state;
    const second = 1000;
    if (timer > 0) {
      setTimeout(
        () => this.setState({
          timer: timer - 1,
        }),
        second,
      );
    }
  };

  validateToken = async () => {
    const token = localStorage.getItem('token');
    const { history } = this.props;
    const magicNumber = 3;
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const data = await response.json();
    if (data.response_code === magicNumber) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ results: data.results });
  };

  handleClick = () => {
    const { currentQuestion } = this.state;
    const magicNumber = 4;
    if (currentQuestion >= magicNumber) {
      this.setState({ currentQuestion: 0 });
    } else {
      this.setState({ currentQuestion: currentQuestion + 1 });
    }
  };

  render() {
    const { results, currentQuestion, timer } = this.state;
    return (
      <div>
        <Header />
        <h3>{timer}</h3>
        {results.length > 0 && (
          <Question
            results={ results }
            currentQuestion={ currentQuestion }
            timer={ timer }
          />
        )}
        <button type="button" onClick={ this.handleClick }>
          NEXT
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
