import { combineReducers } from 'redux';
import player from './player';
import utils from './utils';

const rootReducer = combineReducers({ player, utils });

export default rootReducer;
