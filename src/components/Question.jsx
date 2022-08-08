import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { btnNextAction, initTimerAction } from '../redux/actions';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      timerOn: false,
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
      this.setState({ timer: 30, timerOn: true });
    });
  }

  render() {
    const { results, currentQuestion } = this.props;
    const { timer: test } = this.state;
    const {
      category,
      question,
    } = results[currentQuestion];
    return (
      <div>
        <p>{test}</p>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        {/* {btnNext
        && ( */}
        <button data-testid="btn-next" type="button" onClick={ this.handleClick }>
          NEXT
        </button>
        {/* )} */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendTimer: (timer) => dispatch(initTimerAction(timer)),
  sendBtnNext: (value) => dispatch(btnNextAction(value)),
});

const mapStateToProps = (state) => ({
  btnNext: state.utils.btnNext,
});

Question.propTypes = {
  currentQuestion: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
