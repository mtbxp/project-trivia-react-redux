import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Play

        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
