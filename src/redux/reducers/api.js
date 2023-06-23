import { FEACT_API } from '../actions/actionsTypes';

const INITIAL_STATE = {
};

const featApi = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case FEACT_API:
    return {
      ...state,
      response: payload,
    };
  default:
    return state;
  }
};
export default featApi;
