import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MultipleButtons extends Component {
  render() {
    const { correctAns, incorrectAns } = this.props;
    return (
      <div data-testid="answer-options">
        {incorrectAns.map((element, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `wrong-answer-${index}` }
          >
            {element}
          </button>
        ))}
        <button type="button" data-testid="correct-answer">{correctAns}</button>
      </div>
    );
  }
}

MultipleButtons.propTypes = {
  correctAns: PropTypes.any,
  incorrectAns: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
