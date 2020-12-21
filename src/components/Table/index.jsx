import React from "react";

import { useTable } from "react-table";

function Table({ rowData }) {
  let columns = [];
  let data = [];

  rowData.forEach((row, index) => {
    let currentRow = {};

    row.forEach((item) => {
      if (index === 0) {
        columns.push({ Header: item.columnText, accessor: item.columnName });
      }

      Object.assign(currentRow, { [item.columnName]: item.value });
    });

    data.push(currentRow);
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
