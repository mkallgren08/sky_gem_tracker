import React, { Component } from 'react';
import Table_Cell from './Table_Cell';
import Table_Row from './Table_Row';

const Table = ({children}) => 
    <div>
      <table>
        {children}
      </table>
    </div>;


export default Table;