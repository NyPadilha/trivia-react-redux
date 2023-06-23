import { combineReducers } from 'redux';
import player from './player';
import question from './questions';

const rootReducer = combineReducers({
  player,
  question,
});

export default rootReducer;
