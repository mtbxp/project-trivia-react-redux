import { SAVE_LOGIN } from './actionsType';

const saveLoginAction = (state) => ({
  type: SAVE_LOGIN,
  name: state.name,
  email: state.email,
});

export default saveLoginAction;
