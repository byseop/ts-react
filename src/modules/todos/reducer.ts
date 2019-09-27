import { TodoState, TodosAction } from './types';
import { createReducer } from 'typesafe-actions';
import { TOGGLE_TODO, REMOVE_TODO, ADD_TODO } from './actions';

const initialState: TodoState = [];

const reducer = createReducer<TodoState, TodosAction>(initialState, {
  [ADD_TODO]: (state, action) =>
    state.concat({
      ...action.payload,
      done: false
    }),
  [TOGGLE_TODO]: (state, action) =>
    state.map(todo =>
      todo.id === action.payload ? { ...todo, done: !todo.done } : todo
    ),
  [REMOVE_TODO]: (state, action) =>
    state.filter(todo => todo.id !== action.payload)
});

export default reducer;