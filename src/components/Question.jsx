import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MultipleButtons from './MultipleButtons';

export default class Question extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const oneSecond = 1000;
    if (timer > 0) {
      setTimeout(() => this.setState({ timer: timer - 1 }), oneSecond);
    }
  }

  // resetCounter = () => {
  //   this.setState({ timerCount: 30 });
  // }

  render() {
    const { results, currentQuestion, timer } = this.props;
    const {
      category,
      question,
      difficulty,
      correct_answer: correctAns,
      incorrect_answers: incorrectAns,
    } = results[currentQuestion];
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <MultipleButtons
          answers={ [correctAns, ...incorrectAns] }
          correctAns={ correctAns }
          difficulty={ difficulty }
          timer={ timer }
          disable={ timer }
        />
        <h2>
          Timer:
          {' '}
          { timer }
        </h2>
      </div>
    );
  }
}

Question.propTypes = {
  currentQuestion: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
