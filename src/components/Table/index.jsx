import React, { useEffect, useState } from "react";
import { Dropdown, Pagination } from "react-bootstrap";
import {
  useTable,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  useExpanded,
  usePagination,
} from "react-table";
import { useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faColumns } from "@fortawesome/free-solid-svg-icons/faColumns";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { faTh } from "@fortawesome/free-solid-svg-icons/faTh";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";

import styles from "./index.module.scss";
import "./index.scss";

import GlobalFilter from "./GlobalFilter";
import SubRowAsync from "./RowSubComponent";
import ComponentDatepicker from "../ComponentDatepicker";
import ComponentFilter from "../ComponentFilter";

const Table = ({
  rowData,
  tableRowHeader,
  onEdit,
  onSelect,
  isThumb,
  dataList,
  dataThumb,
  thumbColumnsNumber,
  searchText = "Search...",
  isFilter,
  noSelection = false,
  isList = true,
  noDropDownColumns = false,
  pagination,
  listViewModel,
  searchFunction,
  dataFormFilter,
  hasSubRow,
  isSearch = true,
}) => {
  const [getState, setState] = useState({
    isList: isList,
    isName: "list",
    isFilter: false,
    indexPagination: 0,
    dataFilter: null,
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
      filterTypes,
      onSelect,
      initialState: { pageIndex: getState.indexPagination, pageSize: 25 },
    },
    useFilters,
    useGlobalFilter,
    (hooks) => {
      !noSelection &&
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            Cell: ({ row }) => (
              <div className="wrapper_checkbox">
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
    },
    useExpanded,
    usePagination,
    useRowSelect
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

  const setGlobalFilter = (dataFilter) => {
    console.log("setGlobalFilter");
    console.log(dataFilter);
    if (searchFunction !== undefined) {
      console.log(dataFilter);

      const finalDataFilter = {
        ...getState.dataFilter,
        ...dataFilter,
      };
      console.log(finalDataFilter);
      setState({
        ...getState,
        dataFilter: finalDataFilter,
      });

      searchFunction(finalDataFilter || undefined);
    }
  };

  const renderRowSubComponent = React.useCallback(
    ({ row, rowProps, visibleColumns }) => (
      <SubRowAsync
        row={row}
        rowProps={rowProps}
        visibleColumns={visibleColumns}
        subRowData={listViewModel ? listViewModel : null}
      />
    ),
    []
  );

  const handleFilter = () => {
    setState({
      ...getState,
      isFilter: !getState.isFilter,
    });
  };

  const handlePreviousPage = (i) => {
    listViewModel.getPagination(pagination.page - 1, getState.isList);
  };

  const handleGoToPage = (i) => {
    listViewModel.getPagination(i, getState.isList);
  };

  const handleNextPage = () => {
    listViewModel.getPagination(pagination.page + 1, getState.isList);
  };

  const paginationHTML = () => {
    let paginationHTML = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      paginationHTML.push(
        <button
          key={i}
          onClick={() => handleGoToPage(i)}
          className={`btn ${styles.btn} border-1 border-gray p-0 fs-5 ${
            i === pagination.page
              ? "bg-green text-white border-green"
              : "text-black-50"
          }`}
        >
          {i}
        </button>
      );
    }

    return paginationHTML;
  };

  return (
    <>
      <div className="mb-4">
        <div className="bg-white rounded-3 d-flex align-items-center justify-content-between">
          <div className="wrapper_search_global d-flex align-items-center">
            {isSearch ? (<GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
              searchText={searchText}
              listViewModel={listViewModel}
            />) : null}
            {!noDropDownColumns && (
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
                    {allColumns.map(
                      (column) =>
                        (column.id !== "selection" && column.Header !== "") && (
                          <div key={column.id} className="mb-2">
                            <label>
                              <input
                                type="checkbox"
                                {...column.getToggleHiddenProps()}
                                className="form-check-input p-0"
                              />
                              <span className="ps-2">{column.Header}</span>
                            </label>
                          </div>
                        )
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            {isFilter && (
              <>
                <div className="px-2 border-end-1 w-200">
                  <ComponentDatepicker
                    isDown={true}
                    listViewModel={listViewModel}
                    setGlobalFilter={setGlobalFilter}
                  />
                </div>
                <div className="rounded-0">
                  <button
                    className={`btn ${getState.isFilter ? "bg-blue-3" : ""}`}
                    onClick={handleFilter}
                  >
                    <i>
                      <FontAwesomeIcon icon={faFilter} />
                    </i>
                    <span className="ps-2 pe-5 text-blue-0 opacity-75">
                      Filter
                    </span>
                    <i className="text-green">
                      <FontAwesomeIcon
                        icon={getState.isFilter ? faChevronUp : faChevronDown}
                      />
                    </i>
                  </button>
                </div>
              </>
            )}
          </div>
          {isThumb && (
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
        {isFilter && (
          <>
            <div
              className={`py-2 px-1 bg-blue-3 wrapper_filter_select ${
                getState.isFilter ? "show_filter_select" : ""
              }`}
            >
              {dataFormFilter && (
                <ComponentFilter
                  dataFormFilter={dataFormFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              )}
            </div>
          </>
        )}
      </div>
      {getState.isList ? (
        <div className="bg-white p-3 rounded-3">
          <table {...getTableProps()} className="w-100 mb-4">
            <thead>
              {headerGroups.map((headerGroup) => {
                let newHeaderGroup = "";

                dataList
                  ? (newHeaderGroup = headerGroup.headers.filter(
                      (item) => !dataList.some((other) => item.id === other)
                    ))
                  : (newHeaderGroup = headerGroup.headers);

                return (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="bg-blue"
                  >
                    {newHeaderGroup.map((column) => {
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
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                const rowProps = row.getRowProps();
                let newRowCells = "";

                dataList
                  ? (newRowCells = row.cells.filter(
                      (item) =>
                        !dataList.some((other) => item.column.id === other)
                    ))
                  : (newRowCells = row.cells);

                return (
                  <React.Fragment key={row.getRowProps().key}>
                    <tr
                      {...row.getRowProps()}
                      className="border-bottom-1 cursor-pointer"
                      //onClick={(e) => handerEdit(e, row.original)}
                    >
                      {newRowCells.map((cell) => {
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
                    {hasSubRow == false
                      ? null
                      : row.isExpanded &&
                        renderRowSubComponent({
                          row,
                          rowProps,
                          visibleColumns,
                        })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          <div className="pagination d-flex align-items-center justify-content-center">
            {pagination && (
              <>
                <button
                  //onClick={() => previousPage()}
                  onClick={() => handlePreviousPage()}
                  disabled={pagination && pagination.page <= 1 ? true : false}
                  className={`btn ${styles.btn} border-1 border-gray p-0 text-green`}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                {paginationHTML()}
                <button
                  //onClick={() => nextPage()}
                  onClick={() => handleNextPage()}
                  disabled={
                    pagination && pagination.page === pagination.totalPages
                      ? true
                      : false
                  }
                  className={`btn ${styles.btn} border-1 border-gray p-0 text-green`}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div {...getTableBodyProps()} className="row">
          {page.map((row, i) => {
            prepareRow(row);
            let newRowCells = row.cells;
            if (dataThumb && dataThumb.length > 0) {
              newRowCells = row.cells.filter(
                (item) => !dataThumb.some((other) => item.column.id == other)
              );
            }

            return (
              newRowCells.length > 0 && (
                <div
                  {...row.getRowProps()}
                  className={`col_thumb cursor-pointer ${
                    styles.col_thumb
                  } col-${!thumbColumnsNumber ? "3" : thumbColumnsNumber} mb-4`}
                  onClick={(e) => handerEdit(e, row.original)}
                  key={Math.random(40, 200)}
                >
                  <div
                    className="item_thumb bg-white shadow-sm h-100 p-3 rounded-2"
                    key={Math.random(40, 200)}
                  >
                    {newRowCells.map((cell) => {
                      return (
                        <div
                          {...cell.getCellProps()}
                          className={`ct_cell ${styles.ct_cell} d-block`}
                          key={Math.random(40, 200)}
                        >
                          {cell.render("Cell")}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            );
          })}
          <div className="pagination d-flex align-items-center justify-content-center">
            {pagination && (
              <>
                <button
                  //onClick={() => previousPage()}
                  onClick={() => handlePreviousPage()}
                  disabled={pagination && pagination.page <= 1 ? true : false}
                  className={`btn ${styles.btn} border-1 border-gray p-0 text-green`}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                {paginationHTML()}
                <button
                  //onClick={() => nextPage()}
                  onClick={() => handleNextPage()}
                  disabled={
                    pagination && pagination.page === pagination.totalPages
                      ? true
                      : false
                  }
                  className={`btn ${styles.btn} border-1 border-gray p-0 text-green`}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export default Table;
