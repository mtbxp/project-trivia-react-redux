import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MultipleButtons from './MultipleButtons';

export default class Question extends Component {
  render() {
    const { results, currentQuestion } = this.props;
    const {
      category,
      question,
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
        />
      </div>
    );
  }
}

Question.propTypes = {
  currentQuestion: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
