import React from "react";
import "./Table_Cell.css";

const TableCell = ({ children }) =>
  <div style={{ height: 300 }} className="TableCell">
    {children}
  </div>;

export default TableCell;