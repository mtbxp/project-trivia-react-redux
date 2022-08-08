import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { btnNextAction, initTimerAction, saveScoreAction } from '../redux/actions';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      timerOn: false,
      showAnswers: false,
      // correct: '',
      score: 0,
    };
    this.timer = null;
  }

  componentDidMount() {
    this.setState({ timerOn: true, timer: 30 });
  }

  componentDidUpdate() {
    const { timerOn } = this.state;
    if (timerOn) {
      // const { timer } = this.state;
      // const { sendTimer } = this.props;
      // sendTimer(timer);
      this.gameTimer();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  chooseAnswer = () => {
    this.setState({
      showAnswers: true,
    });
  }

  handleScore = ({ target }) => {
    const { difficulty, sendScore } = this.props;
    const { timer } = this.state;
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

  gameTimer = () => {
    const { timer } = this.state;
    const second = 1000;
    if (timer > 0) {
      this.timer = setTimeout(
        () => this.setState({
          timer: timer - 1,
        }),
        second,
      );
    }
  };

  handleClick = () => {
    const { nextQuestion } = this.props;
    nextQuestion();
    this.setState({ timerOn: false }, () => {
      clearTimeout(this.timer);
      this.setState({ timer: 30, timerOn: true, showAnswers: false });
    });
  }

  render() {
    const { results, currentQuestion } = this.props;
    const { answers, correctAns } = this.props;
    const { showAnswers } = this.state;
    const { timer } = this.state;
    const {
      category,
      question,
    } = results[currentQuestion];
    return (
      <div>
        <p>{timer}</p>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
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
                    clearTimeout(this.timer);

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
                  clearTimeout(this.timer);

                  // sendBtnNext(true);
                } }
                disabled={ timer <= 0 }
              >
                {element}
              </button>);
          })}
        </div>
        {showAnswers
        && (
          <button data-testid="btn-next" type="button" onClick={ this.handleClick }>
            NEXT
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendTimer: (timer) => dispatch(initTimerAction(timer)),
  sendBtnNext: (value) => dispatch(btnNextAction(value)),
  sendScore: (score) => dispatch(saveScoreAction(score)),
});

const mapStateToProps = (state) => ({
  btnNext: state.utils.btnNext,
});

Question.propTypes = {
  currentQuestion: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);

//----------------------------------------------------
