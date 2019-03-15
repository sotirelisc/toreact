import { todosRef } from '../firebase';
import {
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS
} from './types';

export const fetchTodosStarted = () => {
  return {
    type: FETCH_TODOS,
  };
}

export const addToDo = newToDo => async dispatch => {
  todosRef.push().set(newToDo);
};

export const completeToDo = completeToDo => async dispatch => {
  todosRef.child(completeToDo).remove();
};

export const fetchToDos = () => async dispatch => {
  dispatch(fetchTodosStarted());
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS_SUCCESS,
      payload: snapshot.val()
    });
  });
};