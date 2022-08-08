import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveScoreAction } from '../redux/actions';

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

  // componentDidMount() {
  //   const { correctAns, incorrectAns } = this.props;
  //   this.setState({ answers: [correctAns, ...incorrectAns], correct: correctAns });
  // }
  handleScore = ({ target }) => {
    const { difficulty, timer, sendScore } = this.props;
    const magicNumber = 10;
    const { name } = target;
    console.log(name);
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
                name="correct"
                data-testid="correct-answer"
                onClick={ (e) => {
                  this.chooseAnswer();
                  this.handleScore(e);
                } }
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
              name="incorrect"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              onClick={ () => { this.chooseAnswer(); } }
              disabled={ disable <= 0 }
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
});

MultipleButtons.propTypes = {
  correctAns: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(null, mapDispatchToProps)(MultipleButtons);
