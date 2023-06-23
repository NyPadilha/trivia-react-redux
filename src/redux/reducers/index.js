import { combineReducers } from 'redux';
import player from './player';
import question from './questions';
import arraySolution from './arraySolutions';
import api from './api';

const rootReducer = combineReducers({
  player,
  question,
  arraySolution,
  api,
});

export default rootReducer;
