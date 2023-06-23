import { ADD_QUESTIONS, ADD_SCORE, ADD_USER, RANDOM_ARRAY } from './actionsTypes';

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
