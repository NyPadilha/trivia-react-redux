import { combineReducers } from 'redux';
import player from './player';
import question from './questions';
import arraySolution from './arraySolutions';

const rootReducer = combineReducers({
  player,
  question,
  arraySolution,
});

export default rootReducer;
