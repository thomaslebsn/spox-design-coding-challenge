import React, { useEffect, useState } from "react";

function SubRows({ row, rowProps, visibleColumns, data, loading }) {
  if (loading) {
    return (
      <tr>
        <td />
        <td colSpan={visibleColumns.length - 1}>Loading...</td>
      </tr>
    );
  }

  console.log('datadatadata1234561111111111');
  console.log(data);
  console.log(row);

  return (
    <>
      {data && (
        <>
          {data.map((x, i) => {
            return (
              <tr
                {...rowProps}
                key={`${rowProps.key}-expanded-${i}`}
                className="border-bottom-1 row_sub_component"
              >
                {row.cells.map((cell) => {
                  console.log("cell cell", cell);
                  return (
                    <td {...cell.getCellProps()} className="px-2 py-3">
                      {cell.render(cell.column.SubCell ? "SubCell" : "Cell", {
                        value:
                          cell.column.accessor && cell.column.accessor(x, i),
                        row: { ...row, original: x },
                      })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </>
      )}
    </>
  );
}

const SubRowAsync = ({ row, rowProps, visibleColumns, subRowData }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {

    console.log('datadatadata123456999');
    console.log(subRowData);

    const timer = setTimeout(() => {
      setData(subRowData.subRowDataTable);
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SubRows
      row={row}
      rowProps={rowProps}
      visibleColumns={visibleColumns}
      data={data}
      loading={loading}
    />
  );
};

export default SubRowAsync;
