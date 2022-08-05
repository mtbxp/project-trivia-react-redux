import { SAVE_LOGIN } from '../actions/actionsType';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return ({
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    });
  default:
    return state;
  }
};

export default loginReducer;
