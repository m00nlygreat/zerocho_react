import React, {useContext, useCallback} from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL,NORMALIZE_CELL } from './MineSweeper';


const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: "#888",
      };
    case CODE.OPENED:
    case CODE.CLICKED_MINE:
      return { background: "white" };
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return { background: "yellow" };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return { background: "red" };

    
    default:
      return { background: "white" };
  }
};
const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "X";
    case CODE.CLICKED_MINE:
      return "펑";
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return "🚩";
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return "❔";
    default:
      return code || '';
  }
};

const Td = ({rowIndex, cellIndex}) => {
    const {tableData, dispatch, halted} = useContext(TableContext);
    const cellData = tableData[rowIndex][cellIndex];

    const onClickTd = useCallback(() => {
        if (halted) {return;}
        switch (cellData) {
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                break;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row:rowIndex, cell: cellIndex});
                break;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row:rowIndex, cell: cellIndex});
                break;
            default:
                break;
        }

        
    },[cellData, halted]);

    const onRightClickTd = useCallback((e)=> {
        e.preventDefault();
        if (halted) {return;}
        switch(cellData) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.NORMAL:
            default:
                return;
        }

    },[cellData, halted])

    return (
    <td 
    style={getTdStyle(cellData)} 
    onClick={onClickTd}
    onContextMenu={onRightClickTd}>
        {getTdText(cellData)}
    </td>);
}

export default Td;