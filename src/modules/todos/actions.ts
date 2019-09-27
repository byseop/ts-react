import { createAction, createStandardAction } from 'typesafe-actions';

// 액션타입 선언
export const ADD_TODO = 'todos/ADD_TODO' as const;
export const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
export const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

let nextId = 1;

// 커스터마이징 된 payload를 사용 할 경우엔 createAction을 이용한다.
export const addTodo = createAction(ADD_TODO, action => (text: string) =>
  action({
    id: nextId++,
    text
  })
);
// payload가 그대로 들어가는 경우엔 간단하게 처리한다.
export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();
export const removeTodo = createStandardAction(REMOVE_TODO)<number>();