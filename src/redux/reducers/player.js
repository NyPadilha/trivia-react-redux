import { ADD_SCORE, ADD_USER } from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_USER:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};
export default player;
