import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPlayerAction } from '../redux/actions';
import './Ranking.css';

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
    const { history, sendReset } = this.props;
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
    return (
      <div className="card-ranking">
        <h1
          data-testid="ranking-title"
          className="ranking-title"
        >
          Ranking
        </h1>
        <div className="all-players">
          {orderedStandings.map((element, index) => (
            <div key={ index } className="player-ranking">
              <img src={ element.picture } alt="eu" className="img-ranking" />
              <p
                className="name-ranking"
                data-testid={ `player-name-${index}` }
              >
                {element.name}
              </p>
              <p
                className="score-ranking"
                data-testid={ `player-score-${index}` }
              >
                {element.score}
              </p>
            </div>
          ))}
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => { sendReset(); history.push('/'); } }
          className="button-ranking"
        >
          Play
        </button>
      </div>
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
const mapDispatchToProps = (dispatch) => ({
  sendReset: () => dispatch(resetPlayerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
