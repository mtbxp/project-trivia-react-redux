import { RESET_PLAYER, SAVE_LOGIN, SAVE_SCORE } from '../actions/actionsType';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return ({
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    });
  case SAVE_SCORE:
    return ({
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    });
  case RESET_PLAYER:
    return ({
      ...INITIAL_STATE,
    });
  default:
    return state;
  }
};

export default player;
