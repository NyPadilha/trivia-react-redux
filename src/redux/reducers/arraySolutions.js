import { RANDOM_ARRAY } from '../actions/actionsTypes';

const INITIAL_STATE = {
  solutions: [],
};

const arraySolutions = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case RANDOM_ARRAY:
    return {
      ...state,
      solutions: payload,
    };
  default:
    return state;
  }
};
export default arraySolutions;
