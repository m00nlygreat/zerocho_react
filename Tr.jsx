import React from "react";
import Td from "./Td";

const Tr = ( {rowData} ) => {
  console.log(rowData.length);
  return <tr>
    {Array(rowData.length).fill().map((td)=><Td />)}
  </tr>;
};

export default Tr;
