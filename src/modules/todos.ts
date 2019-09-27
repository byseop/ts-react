import {
  createStandardAction,
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';

// 액션타입 선언
const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

let nextId = 1;

// 액션함수 선언
// export const addTodo = (text: string) => ({
//   type: ADD_TODO,
//   payload: {
//     id: nextId++,
//     text
//   }
// });
// export const toggleTodo = (id: number) => ({
//   type: TOGGLE_TODO,
//   payload: id
// });
// export const removeTodo = (id: number) => ({
//   type: REMOVE_TODO,
//   payload: id
// });

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

// 모든 액션 객체들에 대한 타입 준비
// type TodosAction =
//   | ReturnType<typeof addTodo>
//   | ReturnType<typeof toggleTodo>
//   | ReturnType<typeof removeTodo>;
const actions = { addTodo, toggleTodo, removeTodo };
type TodosAction = ActionType<typeof actions>;

// 상태에서 사용 할 할일 항목 데이터 타입 정의
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export type TodoState = Todo[];

// 초기 상태 선언
const initialState: TodoState = [];

// 리듀서 작성
// function todos(state: TodoState = initialState, action: TodosAction): TodoState {
//   switch (action.type) {
//     case ADD_TODO:
//       return state.concat({
//         id: action.payload.id,
//         text: action.payload.text,
//         done: false
//       });
//     case TOGGLE_TODO:
//       return state.map(todo =>
//         todo.id === action.payload ? { ...todo, done: !todo.done } : todo
//       );
//     case REMOVE_TODO:
//       return state.filter(todo => todo.id !== action.payload);
//     default:
//       return state;
//   }
// }
const todos = createReducer<TodoState, TodosAction>(initialState, {
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

export default todos;
