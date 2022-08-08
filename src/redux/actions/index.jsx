import { SAVE_LOGIN, SAVE_SCORE } from './actionsType';

const saveLoginAction = (state) => ({
  type: SAVE_LOGIN,
  name: state.name,
  email: state.email,
});

export const saveScoreAction = (score) => ({
  type: SAVE_SCORE,
  score,
});

export default saveLoginAction;
