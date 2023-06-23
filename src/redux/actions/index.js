import { ADD_QUESTIONS, ADD_USER } from './actionsTypes';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addQuestions = (questions) => ({
  type: ADD_QUESTIONS,
  payload: questions,
});
