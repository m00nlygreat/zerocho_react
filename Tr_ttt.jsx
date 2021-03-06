import React from "react";
import Td from "./Td_ttt";

const Tr = ( {rowData, rowIndex, dispatch} ) => {
  return <tr>
    {Array(rowData.length).fill().map((td, i)=><Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} />)}
  </tr>;
};

export default Tr;
