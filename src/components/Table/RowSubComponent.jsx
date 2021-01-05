import React, { useEffect, useState } from "react";

let contents = [
  {
    id: 1,
    name: "Post 1 - simple",
    description: "Lorem",
    status: 1,
    channels: [
      {
        id: 1,
        name: "facebook 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/facebook.png",
      },
      {
        id: 2,
        name: "instagram 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/instagram.png",
      },
    ],
    campain: {
      id: 1,
      name: "Campain 1",
    },
    persona: [
      {
        id: 1,
        name: "Hieu simple",
      },
      {
        id: 2,
        name: "Hieu simple 2",
      },
    ],
  },
  {
    id: 2,
    name: "Post 2 - simple",
    description: "Lorem",
    status: 2,
    channels: [
      {
        id: 1,
        name: "facebook 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/facebook.png",
      },
    ],
    campain: {
      id: 1,
      name: "Campain 1",
    },
    persona: [
      {
        id: 1,
        name: "Hieu simple",
      },
      {
        id: 2,
        name: "Hieu simple 2",
      },
    ],
  },

  {
    id: 3,
    name: "Post 3 - simple",
    description: "Lorem",

    status: 3,
    channels: [
      {
        id: 1,
        name: "facebook 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/facebook.png",
      },
    ],
    campain: {
      id: 1,
      name: "Campain 1",
    },
    persona: [
      {
        id: 1,
        name: "Hieu simple",
      },
      {
        id: 2,
        name: "Hieu simple 2",
      },
    ],
  },
];

function SubRows({ row, rowProps, visibleColumns, data, loading }) {
  if (loading) {
    return (
      <tr>
        <td />
        <td colSpan={visibleColumns.length - 1}>Loading...</td>
      </tr>
    );
  }

  return (
    <>
      {data.map((x, i) => {
        return (
          <tr
            {...rowProps}
            key={`${rowProps.key}-expanded-${i}`}
            className="border-bottom-1"
          >
            {row.cells.map((cell) => {
              console.log("cell cell", cell);
              return (
                <td {...cell.getCellProps()} className="px-2 py-3">
                  {cell.render(cell.column.SubCell ? "SubCell" : "Cell", {
                    value: cell.column.accessor && cell.column.accessor(x, i),
                    row: { ...row, original: x },
                  })}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}

const SubRowAsync = ({ row, rowProps, visibleColumns }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setData(contents);
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
