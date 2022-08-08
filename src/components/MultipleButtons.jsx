import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MultipleButtons extends Component {
  constructor() {
    super();

    this.state = {
      showAnswers: false,
      // correct: '',
    };
  }

  chooseAnswer = () => {
    this.setState({
      showAnswers: true,
    });
  }

  // componentDidMount() {
  //   const { correctAns, incorrectAns } = this.props;
  //   this.setState({ answers: [correctAns, ...incorrectAns], correct: correctAns });
  // }

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  render() {
    const { answers, correctAns, disable } = this.props;
    const { showAnswers } = this.state;
    return (
      <div data-testid="answer-options">
        {this.shuffleArray(answers).map((element, index) => {
          if (element === correctAns) {
            return (
              <button
                className={ showAnswers ? 'correct-answer' : '' }
                key={ index }
                type="button"
                data-testid="correct-answer"
                onClick={ this.chooseAnswer }
                disabled={ disable <= 0 }
              >
                {element}
              </button>
            );
          }
          return (
            <button
              className={ showAnswers ? 'wrong-answer' : '' }
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.chooseAnswer }
              disabled={ disable <= 0 }
            >
              {element}
            </button>);
        })}
      </div>
    );
  }
}

MultipleButtons.propTypes = {
  correctAns: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
