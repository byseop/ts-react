import React, { useReducer, useContext, createContext, Dispatch } from 'react';

// 필요한 타입들을 미리 선언
type Color = 'red' | 'orange' | 'yellow';

// 상태를 위한 타입
type State = {
    count: number;
    text: string;
    color: Color;
    isGood: boolean;
};

// 모든 액션들을 위한 타입
type Action =
    | { type: 'SET_COUNT'; count: number; }
    | { type: 'SET_TEXT'; text: string; }
    | { type: 'SET_COLOR'; color: Color; }
    | { type: 'TOGGLE_GOOD'; }

// 디스패치를 위한 타입(Dispatch 를 리액트에서 불러올 수 있음)
// 액션들의 타입을 Dispatch 의 Generics로 설정
type SampleDispatch = Dispatch<Action>;

// Context 만들기
const SampleStateContext = createContext<State | null>(null);
const SampleDispatchContext = createContext<SampleDispatch | null>(null);

// 리듀서
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_COUNT':
            return {
                ...state,
                count: action.count
            }
        case 'SET_TEXT':
            return {
                ...state,
                text: action.text
            }
        case 'SET_COLOR':
            return {
                ...state,
                color: action.color
            }
        case 'TOGGLE_GOOD':
            return {
                ...state,
                isGood: !state.isGood
            }
        default: 
            throw new Error('Unhandled type');
    }
}

// SampleProvider 에서 useReducer를 사용하고
// SampleStateContext.Provider 와 SampleDispatchContext.Provider 로 childern을 감싸서 반환해준다
export function SampleProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
        count: 0,
        text: 'hello',
        color: 'red',
        isGood: true
    });

    return (
        <SampleStateContext.Provider value={state}>
            <SampleDispatchContext.Provider value={dispatch}>
                {children}
            </SampleDispatchContext.Provider>
        </SampleStateContext.Provider>
    );
}

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useSampleState() {
    const state = useContext(SampleStateContext);
    if (!state) throw new Error('Cannot find SampleProvider');
    return state;
}
export function useSampleDispatch() {
    const dispatch = useContext(SampleDispatchContext);
    if (!dispatch) throw new Error('Cannot find SampleProvider');
    return dispatch;
}