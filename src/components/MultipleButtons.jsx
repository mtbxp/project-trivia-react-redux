import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MultipleButtons extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     answers: [],
  //     correct: '',
  //   };
  // }

  // componentDidMount() {
  //   const { correctAns, incorrectAns } = this.props;
  //   this.setState({ answers: [correctAns, ...incorrectAns], correct: correctAns });
  // }

  render() {
    const { answers, correctAns } = this.props;
    return (
      <div data-testid="answer-options">
        {answers.sort().map((element, index) => {
          if (element === correctAns) {
            return (
              <button
                key={ index }
                type="button"
                data-testid="correct-answer"
              >
                {element}
              </button>
            );
          }
          return (
            <button
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
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
