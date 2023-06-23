import { ADD_USER } from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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

  default:
    return state;
  }
};
export default player;
