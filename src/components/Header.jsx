import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Header extends Component {
  generateHash = () => {
    const { gravatarEmail } = this.props;
    const hash = MD5(gravatarEmail).toString();
    return hash;
  }

  render() {
    const { name, score } = this.props;
    return (
      <header>
        <div className="header-trivia">
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${this.generateHash()}` } alt="foto perfil" />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">
            Score:
            {' '}
            {score}
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  gravatarEmail: state.loginReducer.gravatarEmail,
  name: state.loginReducer.name,
  score: state.loginReducer.score,
});

export default connect(mapStateToProps)(Header);
