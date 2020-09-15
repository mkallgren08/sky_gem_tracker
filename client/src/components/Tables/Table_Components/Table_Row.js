import React from "react";
import "./Table_Row.css";

const TableRow = ({ children }) =>
  <div style={{ height: 300 }} className="TableRow">
    {children}
  </div>;

export default TableRow;