import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      standings: [],
    };
  }

  componentDidMount() {
    const standings = JSON.parse(localStorage.getItem('ranking'));
    console.log(standings);
    this.setState({ standings });
  }

  render() {
    const { history } = this.props;
    const { standings } = this.state;
    const orderedStandings = standings.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return Number('-1');
      }
      return 0;
    });
    console.log(orderedStandings);
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
        {standings.map((element, index) => (
          <div key={ index }>
            <img src={ element.picture } alt="eu" />
            <p data-testid={ `player-name-${index}` }>{element.name}</p>
            <p data-testid={ `player-score-${index}` }>{element.score}</p>
          </div>
        ))}
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);
