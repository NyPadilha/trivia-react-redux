import { ADD_USER } from './actionsTypes';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});
