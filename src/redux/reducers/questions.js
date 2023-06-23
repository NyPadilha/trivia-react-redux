import { ADD_QUESTIONS } from '../actions/actionsTypes';

const INITIAL_STATE = {
  questions: [],
};

const question = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_QUESTIONS:
    return {
      ...state,
      questions: payload,
    };
  default:
    return state;
  }
};
export default question;
