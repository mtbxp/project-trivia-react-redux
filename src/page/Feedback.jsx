import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    const { score, name } = this.props;
    if (localStorage.getItem('ranking') !== null) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const newRanking = [...ranking, { score, picture: `https://www.gravatar.com/avatar/${this.generateHash()}`, name }];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    } else {
      const newRanking = [{ score, picture: `https://www.gravatar.com/avatar/${this.generateHash()}`, name }];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  generateHash = () => {
    const { gravatarEmail } = this.props;
    const hash = MD5(gravatarEmail).toString();
    return hash;
  }

  render() {
    const { assertions, score, history } = this.props;
    return (
      <>
        <Header />
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <p data-testid="feedback-text">
          {assertions >= Number('3')
            ? 'Well Done!'
            : 'Could be better...'}
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </>
    );
  }
}
Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;
const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Feedback);
