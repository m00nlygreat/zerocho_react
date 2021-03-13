import React, { useReducer, createContext, useMemo } from "react";
import Table from "./Table";
import Form from "./Form";

export const CODE = { MINE: -7, NORMAL: -1, QUESTION: -2, FLAG: -3, QUESTION_MINE: -4, FLAG_MINE: -5, CLICKED_MINE: -6, OPENED: 0, }

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
    halted: true,
}); // 빈 형태만 넣어준다.

const initialState = {
  tableData: [],
  timer: 0,
  result: 0,
  halted: true,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row*cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row*cell-mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i=0; i<row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j=0; j< cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
    for (let k=0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;

}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const CLICK_MINE = 'CLICK_MINE';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      let around = [];

      if (tableData[action.row - 1]) {
        around = around.concat(
          tableData[action.row - 1][action.cell - 1],
          tableData[action.row - 1][action.cell],
          tableData[action.row - 1][action.cell + 1]
        );
      }
      around = around.concat(
        tableData[action.row][action.cell - 1],
        tableData[action.row][action.cell + 1]
      );
      if (tableData[action.row + 1]) {
        around = around.concat(
          tableData[action.row+1][action.cell - 1],
          tableData[action.row+1][action.cell],
          tableData[action.row+1][action.cell + 1]
        );
      }

      const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
      console.log(count, around);
      tableData[action.row][action.cell] = count;

      return { ...state, tableData, };    
    } // 여러줄이어서 중괄호 쓴건가?
    
    case CLICK_MINE: {
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        tableData[action.row][action.cell] = CODE.CLICKED_MINE;
        return { ...state, tableData, halted: true};    
      }
    case FLAG_CELL:{
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        if (tableData[action.row][action.cell]===CODE.NORMAL)
        {tableData[action.row][action.cell] = CODE.FLAG}
        else {tableData[action.row][action.cell] = CODE.FLAG_MINE}
        return { ...state, tableData};}
    case QUESTION_CELL:{
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        if (tableData[action.row][action.cell]===CODE.FLAG)
        {tableData[action.row][action.cell] = CODE.QUESTION}
        else {tableData[action.row][action.cell] = CODE.QUESTION_MINE}
        return { ...state, tableData};}   
    case NORMALIZE_CELL:{
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        if (tableData[action.row][action.cell]===CODE.QUESTION)
        {tableData[action.row][action.cell] = CODE.NORMAL}
        else {tableData[action.row][action.cell] = CODE.MINE}
        return { ...state, tableData};}   
            
    default:
      return state;
  }
};

const MineSweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, halted, timer, result} = state;
  const value = useMemo(() => ({tableData, halted, dispatch}), [tableData, halted]);
  // dispatch는 같은 객체가 유지되므로, useMemo의 인수로 넣을 필요 없다.

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSweeper;
