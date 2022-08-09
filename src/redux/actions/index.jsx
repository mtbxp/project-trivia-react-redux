import { BTN_NEXT, INIT_TIMER,
  RESET_PLAYER, SAVE_LOGIN, SAVE_SCORE } from './actionsType';

const saveLoginAction = (state) => ({
  type: SAVE_LOGIN,
  name: state.name,
  email: state.email,
});

export const saveScoreAction = (score) => ({
  type: SAVE_SCORE,
  score,
});

export const initTimerAction = (timer) => ({
  type: INIT_TIMER,
  timer,
});

export const btnNextAction = (btnNext) => ({
  type: BTN_NEXT,
  btnNext,
});

export const resetPlayerAction = () => ({
  type: RESET_PLAYER,
});

export default saveLoginAction;
