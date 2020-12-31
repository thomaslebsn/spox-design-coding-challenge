import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

import {
  useTable,
  usePagination,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faColumns } from "@fortawesome/free-solid-svg-icons/faColumns";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { faTh } from "@fortawesome/free-solid-svg-icons/faTh";
import styles from "./index.module.scss";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="d-flex align-items-center position-relative pe-3 border-end-1 w-400">
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search your projects`}
        className="form-control border-end-0 pe-2 border-0 pe-4"
      />
      <i className="text-green position-absolute top-0 bottom-0 end-0 pe-4 d-flex align-items-center">
        <FontAwesomeIcon icon={faSearch} />
      </i>
    </span>
  );
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function Table({ rowData, tableRowHeader, onEdit, onSelect, isProject }) {
  const [getState, setState] = useState({
    isList: true,
    isName: "list",
  });

  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const handerEdit = (e, row) => {
    if (e.target.type !== "checkbox") {
      onEdit(row);
    }
  };

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input
            className="form-check-input p-0"
            type="checkbox"
            ref={resolvedRef}
            {...rest}
          />
        </>
      );
    }
  );

  const columns = useMemo(() => tableRowHeader, [tableRowHeader]);

  const data = useMemo(() => rowData, [rowData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      onSelect,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    const selectedIds = Object.keys(selectedRowIds);

    if (selectedIds.length > 0) {
      var selectedRowsData = selectedIds
        .map((x) => data[x])
        .filter(function (x) {
          return x != null;
        });
      onSelect(selectedRowsData);
    }
  }, [selectedRowIds, onSelect, data]);

  const _handleList = (name) => {
    setState({
      ...getState,
      isList: getState.isName === name ? true : false,
    });
  };

  return (
    <>
      <div className="bg-white rounded-3 mb-4 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <div className="px-2 border-end-1">
            <Dropdown>
              <Dropdown.Toggle
                variant="info"
                id="actions"
                className={`btn_toggle ${styles.btn_toggle}`}
              >
                <i>
                  <FontAwesomeIcon icon={faColumns} />
                </i>
                <span className="ps-2 pe-5 text-blue-0 opacity-75">
                  Columns
                </span>
                <i className="text-green">
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="pt-3 px-2 border-0 shadow">
                <div className="mb-2">
                  <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
                  <span className="ps-2">All</span>
                </div>
                {allColumns.map((column) => (
                  <div key={column.id} className="mb-2">
                    <label>
                      <input
                        type="checkbox"
                        {...column.getToggleHiddenProps()}
                        className="form-check-input p-0"
                      />
                      <span className="ps-2">{column.id}</span>
                    </label>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {isProject && (
          <div className="d-flex align-items-center">
            <button
              type="button"
              className={`btn text-blue-0 rounded-0 px-4 ${
                getState.isList ? "bg-blue-3" : ""
              }`}
              onClick={() => _handleList("list")}
            >
              <i>
                <FontAwesomeIcon icon={faList} />
              </i>
              <span className="ms-2 opacity-75">List</span>
            </button>
            <button
              type="button"
              className={`btn text-blue-0 rounded-0 px-4 ${
                !getState.isList ? "bg-blue-3" : ""
              }`}
              onClick={() => _handleList("thumb")}
            >
              <i>
                <FontAwesomeIcon icon={faTh} />
              </i>
              <span className="ms-2 opacity-75">Thumb</span>
            </button>
          </div>
        )}
      </div>
      {getState.isList ? (
        <div className="bg-white p-3 rounded-3">
          <table {...getTableProps()} className="w-100 mb-4">
            {isProject ? (
              <thead>
                {headerGroups.map((headerGroup) => {
                  let arrayHeadersFilter = headerGroup.headers.filter(
                    (item) =>
                      item !== headerGroup.headers[2] &&
                      item !== headerGroup.headers[6]
                  );
                  return (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className="bg-blue"
                    >
                      {arrayHeadersFilter.map((column) => {
                        return (
                          <th
                            {...column.getHeaderProps()}
                            className="fw-normal px-2 py-3 flex-1"
                          >
                            {column.render("Header")}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
            ) : (
              <thead>
                {headerGroups.map((headerGroup) => {
                  return (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className="bg-blue"
                    >
                      {headerGroup.headers.map((column) => {
                        return (
                          <th
                            {...column.getHeaderProps()}
                            className="fw-normal px-2 py-3 flex-1"
                          >
                            {column.render("Header")}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
            )}
            {isProject ? (
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  let arrayCells = row.cells.filter(
                    (item) => item !== row.cells[2] && item !== row.cells[6]
                  );
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="border-bottom-1"
                      onClick={(e) => handerEdit(e, row.original)}
                    >
                      {arrayCells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="fw-normal px-2 py-3"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="border-bottom-1"
                      onClick={(e) => handerEdit(e, row.original)}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="fw-normal px-2 py-3"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          <div className="pagination d-flex align-items-center justify-content-center">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`btn ${styles.btn} border-1 border-gray p-0 text-green`}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>{" "}
            {pageOptions.map((item, key) => {
              return (
                <button
                  key={key}
                  onClick={() => gotoPage(item)}
                  className={`btn ${styles.btn} border-1 border-gray p-0 fs-5 ${
                    item === state.pageIndex
                      ? "bg-green text-white border-green"
                      : "text-black-50"
                  }`}
                >
                  {item + 1}
                </button>
              );
            })}
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`btn ${styles.btn} border-1 border-gray p-0 text-green`}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      ) : (
        <div {...getTableBodyProps()} className="row">
          {page.map((row, i) => {
            prepareRow(row);
            let arrayCells = row.cells.filter(
              (item) =>
                item !== row.cells[0] &&
                item !== row.cells[3] &&
                item !== row.cells[4]
            );

            return (
              <>
                {arrayCells.length > 0 && (
                  <div
                    {...row.getRowProps()}
                    className={`col_thumb ${styles.col_thumb} col-3 mb-4`}
                    onClick={(e) => handerEdit(e, row.original)}
                  >
                    <div className="bg-white shadow-sm h-100 p-3 rounded-2">
                      {arrayCells.map((cell) => {
                        return (
                          <div
                            {...cell.getCellProps()}
                            className={`ct_cell ${styles.ct_cell} d-block`}
                          >
                            {cell.render("Cell")}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      )}
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export default Table;
