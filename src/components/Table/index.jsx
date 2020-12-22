import React from "react";

import { useTable } from "react-table";

function Table({ rowData }) {
  let columns = [];
  let data = [];
  if (rowData) {
    console.log("Rendering Table Row");
    console.log(rowData);
    rowData.forEach((row, index) => {
      let currentRow = {};
      console.log("Debuggin Each Row when renderring");
      console.log(row);
      row.forEach((item) => {
        if (index === 0) {
          columns.push({ Header: item.columnText, accessor: item.columnName });
        }

        Object.assign(currentRow, { [item.columnName]: item.value });
      });

      data.push(currentRow);
    });
  } else {
    console.log("No Data Found");
  }

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
