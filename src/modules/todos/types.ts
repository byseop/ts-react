import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

// 한번에 모두 actions에 담아서 import 했기 때문에
// 액션의 종류가 많아져도 한 줄로 작성할 수 있어 매우 편하다.
export type TodosAction = ActionType<typeof actions>;

// 상태에서 사용 할 할일 항목 데이터 타입 정의
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export type TodoState = Todo[];