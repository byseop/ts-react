// 액션 타입을 선언한다.
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들때 action.type의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE'와 같이 실제 문자열 값으로 추론되도록 해준다.

const INCREASE = 'counter/INCREASE' as const;
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;

// 액션 함수를 선언한다
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseby = (diff: number) => ({
  type: INCREASE_BY,
  // 액션에 부가적으로 필요한 값을 payload 라는 이름으로 통일한다.
  // 이는 FSA 라는 규칙인데, 이 규칙을 적용하면 액션들이 모두 비슷한 구조로 이루어져있게 되어
  // 추후 다룰때도 편하고 읽기 쉽고, 액션 구조를 일반화 함으로써 액션에 관련된 라이브러리를 사용할 수 있게 해준다.
  // 다만 무조건 따를 필요는 없다.
  payload: diff
});

// 모든 객체들의 대한 타입을 준비한다
// ReturnType<typeof ___> 는 특정 함수의 반환값을 추론해준다.
// 상단부에서 액션타입을 선언 할 때 as const 를 하지 않으면 이 부분이 제대로 작동하지 않는다.
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseby>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언한다.
type CounterState = {
  count: number;
};

// 초기상태를 선언한다.
const initialState: CounterState = {
  count: 0
};

// 리듀서를 작성한다.
// 리듀서에서는 state와 함수의 반환값이 일치하도록 작성한다.
// 액션에서는 우리가 방금 만든 CounterAction 을 타입으로 설정한다.
function counter(
  state: CounterState = initialState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        count: state.count + 1
      };
    case DECREASE:
      return {
        ...state,
        count: state.count - 1
      };
    case INCREASE_BY:
      return {
        ...state,
        count: state.count + action.payload
      };
    default:
      return state;
  }
}

export default counter;
