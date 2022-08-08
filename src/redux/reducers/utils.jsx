import { BTN_NEXT, INIT_TIMER } from '../actions/actionsType';

const INITIAL_STATE = {
  btnNext: false,
};

const utils = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INIT_TIMER:
    return ({
      ...state,
      timer: action.timer,
    });
  case BTN_NEXT:
    return ({
      ...state,
      btnNext: action.btnNext,
    });
  default:
    return state;
  }
};

export default utils;
