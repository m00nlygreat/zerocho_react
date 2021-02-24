import React, {useState, useReducer, useCallback} from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['','',''],['','',''],['','','']],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner,
            }
            case CLICK_CELL:

            const tableData = [...state.tableData]; // 리액트의 불변성.. 무조건 state를 그대로 쓰지말고 얕은 복사 (spread, 전개 문법) 한다.
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            
            return {
                ...state,
                tableData,
            };

            case CHANGE_TURN:
                return {
                    ...state,
                    turn: state.turn === 'O' ? 'X' : 'O',
                };
    }
};

const TicTacToe = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const onClickTable = useCallback(()=>{
        dispatch({ type: SET_WINNER, winner: 'O'});
    },[]);

    return(
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}님의 승리!</div>}
        </>
    )

};

export default TicTacToe;