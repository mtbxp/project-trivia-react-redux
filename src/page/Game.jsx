import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import { initTimerAction } from '../redux/actions';
import './style.css';

class Game extends Component {
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

  nextQuestion = () => {
    const { currentQuestion } = this.state;
    const { history } = this.props;
    const magicNumber = 4;
    if (currentQuestion >= magicNumber) {
      this.setState({ currentQuestion: 0 });
      history.push('/feedback');
    } else {
      this.setState({
        currentQuestion: currentQuestion + 1,
      });
    }
  }

  render() {
    const { results, currentQuestion } = this.state;
    const answers = results.length > 0
      && [
        results[currentQuestion].correct_answer,
        ...results[currentQuestion].incorrect_answers,
      ].sort(() => Math.random() - Number('0.5'));
    return (
      <div>
        <Header />
        {results.length > 0 && (
          <Question
            results={ results }
            currentQuestion={ currentQuestion }
            // timer={ timer }
            nextQuestion={ this.nextQuestion }
            answers={ answers }
            correctAns={ results[currentQuestion].correct_answer }
            difficulty={ results[currentQuestion].difficulty }
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendTimer: (timer) => dispatch(initTimerAction(timer)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Game);
