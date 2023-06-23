import { ADD_QUESTIONS, ADD_SCORE, ADD_USER, FEACT_API,
  RANDOM_ARRAY } from './actionsTypes';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addQuestions = (questions) => ({
  type: ADD_QUESTIONS,
  payload: questions,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  payload: score,
});
export const randomArray = (array) => ({
  type: RANDOM_ARRAY,
  payload: array,
});
export const walletChanged = (wallet) => ({
  type: FEACT_API,
  payload: wallet,
});

export const fetchApi = (token) => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  dispatch(walletChanged(data));
};
