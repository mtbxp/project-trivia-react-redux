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
  shuffleArray = (arr) => {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  render() {
    const { answers, correctAns } = this.props;
    return (
      <div data-testid="answer-options">
        {this.shuffleArray(answers).map((element, index) => {
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
