import { ADD_QUESTIONS, ADD_USER, RANDOM_ARRAY } from './actionsTypes';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addQuestions = (questions) => ({
  type: ADD_QUESTIONS,
  payload: questions,
});

export const randomArray = (array) => ({
  type: RANDOM_ARRAY,
  payload: array,
});
