import React from "react";
import { FORM_FIELD_TYPE } from "../../constants/FormFieldType";
import FormSelectDropdown from "../../components/Form/FormSelectDropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons/faAngleDoubleLeft";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons/faAngleDoubleRight";

import styles from "./index.module.scss";
import "./index.scss";

const PaginationComponent = ({
  listViewModel,
  pagination,
  pageSize,
  isList,
}) => {
  const handleGoToPage = (i) => {
    listViewModel.getPagination(i, isList);
  };

  const handlePreviousFirstPage = () => {
    listViewModel.getPagination(1, isList);
  };

  const handlePreviousLastPage = () => {
    listViewModel.getPagination(pagination.totalPages, isList);
  };

  const handlePreviousPage = (i) => {
    listViewModel.getPagination(pagination.page - 1, isList);
  };

  const handleNextPage = () => {
    listViewModel.getPagination(pagination.page + 1, isList);
  };

  const paginationHTML = () => {
    let paginationHTML = [];
    let currentNumber = pagination.page;
    for (let i = 1; i <= pagination.totalPages; i++) {
      paginationHTML.push(
        <button
          key={i}
          onClick={() => handleGoToPage(i)}
          className={`btn ${styles.btn} border-1 border-gray p-0 fs-6 ${
            i === currentNumber
              ? "active bg-green text-white border-green"
              : "text-black-50"
          } ${
            i === currentNumber - 1 ||
            i === currentNumber - 2 ||
            i === currentNumber - 3 ||
            i === currentNumber + 1 ||
            i === currentNumber + 2 ||
            i === currentNumber + 3
              ? "visible_number"
              : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return paginationHTML;
  };

  let pageSizeDropdown = {
    label: "Page size",
    key: "page_size",
    type: FORM_FIELD_TYPE.DROPDOWN,
    value: pageSize,
    required: false,
    option: [
      { value: 5, label: "Show 5" },
      { value: 10, label: "Show 10" },
      { value: 15, label: "Show 15" },
      { value: 20, label: "Show 20" },
    ],
    changed: (object) => {
      listViewModel.pageSize = object.value;
      listViewModel.getPagination(0, isList);
    },
    isMulti: false,
  };

  console.log('paginationpagination123');
  console.log(pagination.totalPages);

  return (
    <>
      <div className="w-150">
        <FormSelectDropdown field={pageSizeDropdown} />
      </div>
      <div className={"ps-3 col-md-9 d-flex justify-content-end"}>
        {/* <button
          onClick={() => handlePreviousFirstPage()}
          disabled={pagination && pagination.page <= 1 ? true : false}
          className={`btn ${styles.btn} border-1 border-gray p-0 text-green`}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button> */}
        
        <button
          //onClick={() => previousPage()}
          onClick={() => handlePreviousPage()}
          disabled={pagination && pagination.page <= 1 ? true : false}
          className={`btn ${styles.btn} border-1 border-gray p-0 text-green`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {
          pagination && (pagination.totalPages > 1) && (
            <button
              onClick={() => handlePreviousFirstPage()}
              className={`btn ${styles.btn} border-1 border-gray p-0 fs-6 ${
                1 === pagination.page
                  ? "active bg-green text-white border-green"
                  : "text-black-50"
              }`}
            >
              1
            </button>
          )
        }
        <p
          className={`mb-0 d-flex align-items-end ms-2 me-2 text-black-50 fs-5 ${
            pagination.page === 1 ||
            pagination.page === 2 ||
            pagination.page === 3 ||
            pagination.page === 4 ||
            pagination.page === 5
              ? "isHidden"
              : ""
          }`}
        >
          ...
        </p>
        <div className="wr_pagination_number">{paginationHTML()}</div>

        <p
          className={`mb-0 d-flex align-items-end ms-2 me-2 text-black-50 fs-5 ${
            pagination.page === pagination.totalPages - 4 ||
            pagination.page === pagination.totalPages - 3 ||
            pagination.page === pagination.totalPages - 2 ||
            pagination.page === pagination.totalPages - 1 ||
            pagination.page === pagination.totalPages
              ? "isHidden"
              : ""
          }`}
        >
          ...
        </p>
        <button
          onClick={() => handlePreviousLastPage()}
          className={`btn ${styles.btn} border-1 border-gray p-0 fs-6 ${
            pagination.totalPages === pagination.page
              ? "active bg-green text-white border-green"
              : "text-black-50"
          }`}
        >
          {pagination.totalPages}
        </button>
        <button
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
        {/* <button
          onClick={() => handlePreviousLastPage()}
          disabled={
            pagination && pagination.page === pagination.totalPages
              ? true
              : false
          }
          className={`btn ${styles.btn} border-1 border-gray p-0 text-green`}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button> */}
      </div>
    </>
  );
};

export default PaginationComponent;
