import React, { useContext } from 'react';
import { TableContext } from './MineSweeper';
import Tr from './Tr';

const Table = () => {
    const { tableData } = useContext(TableContext);
    // value.tableData

    return (
        <table>
            {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i}/>)}
        </table>
    )
}

export default Table;