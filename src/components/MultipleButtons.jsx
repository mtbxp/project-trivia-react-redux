import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { btnNextAction, saveScoreAction } from '../redux/actions';

class MultipleButtons extends Component {
  constructor() {
    super();

    this.state = {
      showAnswers: false,
      // correct: '',
      score: 0,
    };
  }

  chooseAnswer = () => {
    this.setState({
      showAnswers: true,
    });
  }

  handleScore = ({ target }) => {
    const { difficulty, timer, sendScore } = this.props;
    const magicNumber = 10;
    const { name } = target;
    const multiplier = () => {
      if (difficulty === 'hard') {
        return '3';
      }
      if (difficulty === 'medium') {
        return '2';
      }
      return '1';
    };
    if (name === 'correct') {
      const newScore = magicNumber + (timer * Number(multiplier()));
      this.setState({ score: newScore }, () => {
        const { score } = this.state;
        sendScore(score);
      });
    }
  }

  render() {
    const { answers, correctAns, timer } = this.props;
    const { showAnswers } = this.state;
    return (
      <div data-testid="answer-options">
        {answers.map((element, index) => {
          if (element === correctAns) {
            return (
              <button
                className={ showAnswers ? 'correct-answer' : '' }
                key={ index }
                type="button"
                name="correct"
                data-testid="correct-answer"
                onClick={ (e) => {
                  this.chooseAnswer();
                  this.handleScore(e);
                  // sendBtnNext(true);
                } }
                disabled={ timer <= 0 }
              >
                {element}
              </button>
            );
          }
          return (
            <button
              className={ showAnswers ? 'wrong-answer' : '' }
              type="button"
              name="incorrect"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              onClick={ () => {
                this.chooseAnswer();
                // sendBtnNext(true);
              } }
              disabled={ timer <= 0 }
            >
              {element}
            </button>);
        })}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendScore: (score) => dispatch(saveScoreAction(score)),
  sendBtnNext: (value) => dispatch(btnNextAction(value)),
});
const mapStateToProps = (state) => ({
  timer: state.utils.timer,
});

MultipleButtons.propTypes = {
  correctAns: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(MultipleButtons);
