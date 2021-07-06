import React, { Component } from "react";

import history from "../../../routes/history";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";

import PAGE_STATUS from "../../../constants/PageStatus";
import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";

import Table from "../../../components/Table";

import { observer } from "mobx-react";
import { withContentViewModel } from "../ContentViewModels/ContentViewModelContextProvider";

import Spinner from "../../../components/Spinner";
import { Image } from "react-bootstrap";
import ComponentNoData from "../../../components/ComponentNoData";

import getStatus from '../../../utils/status';

const ContentsList = observer(
  class ContentsList extends Component {
    contentListViewModel = null;
    contentsFilterFormViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ContentList - Debug View Model");
      console.log(viewModel);
      this.contentListViewModel = viewModel
        ? viewModel.getContentListViewModel()
        : null;

      console.log("After binding class");
      console.log(this.contentListViewModel);

      this.contentFormModalViewModel = viewModel
        ? viewModel.getContentFormViewModel()
        : null;

      this.contentsFilterFormViewModel = viewModel
        ? viewModel.getContentsFilterFormViewModel()
        : null;
    }

    componentDidMount() {
      this.contentListViewModel.initializeData();
      this.contentsFilterFormViewModel.initData();
    }

    handerEditContent = (e, row) => {
      history.push(`/content/edit/${row[CONTENT_FIELD_KEY.ID]}`, {
        form: true,
        id: row[CONTENT_FIELD_KEY.ID],
      });
    };

    handleExpanded = (e, row) => {
      console.log("rowrowrowrowrowrowrowrowrow", row);
      this.contentListViewModel.getContentByIdExpanded(
        row[CONTENT_FIELD_KEY.ID]
      );
    };

    handerSelectContent = (data) => {
      this.contentListViewModel.contentIdsSelected = data
        .map((item) => {
          console.log("Debug An Item");
          console.log(item);
          return item[CONTENT_FIELD_KEY.ID];
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
    };

    getDataFormFilter = () => {
      console.log("this.contentsFilterFormViewModel");
      console.log(this.contentsFilterFormViewModel);

      const campaignMasterData = this.contentsFilterFormViewModel
        .campaignsMasterData;
      console.log(campaignMasterData);
      return [
        // {
        //   name: "persona",
        //   option: this.contentsFilterFormViewModel.personaMasterData,
        //   isMulti: true,
        // },
        {
          name: "campaigns",
          option: this.contentsFilterFormViewModel.campaignsMasterData,
          isMulti: true,
        },
      ];
    };

    render() {
      console.log("[Quick Edit Product] - re-render .........");
      const { tableStatus, contents, pagination } = this.contentListViewModel;

      console.log("contents api, contents api", contents);
      console.log("pagination pagination", pagination);
      const dataFormFilter = this.getDataFormFilter();
      const tableRowHeader = [
        {
          Header: "",
          accessor: CONTENT_FIELD_KEY.NAME,
          id: "expander",
          Cell: ({ row }) => (
            <>
              {
                !(row.original[CONTENT_FIELD_KEY.STATUS] === 'save_as_draft') && (
                  <div {...row.getToggleRowExpandedProps()} className="d-flex">
                    <i
                      className="text-green icon_expander"
                      onClick={(e) => this.handleExpanded(e, row.original)}
                    >
                      <FontAwesomeIcon icon={row.isExpanded ? faMinus : faPlus} />
                    </i>
                  </div>
                )
              }
            </>
            
          ),
          SubCell: () => null
        },
        {
          Header: "Title",
          accessor: CONTENT_FIELD_KEY.NAME,
          Cell: ({ row }) => (
            console.log("row.original title", row),
            (
              <div className="d-flex">
                <span
                  className="text-black opacity-75"
                  // onClick={(e) => this.handerEditContent(e, row.original)}
                >
                  {row.original[CONTENT_FIELD_KEY.NAME]}
                </span>
              </div>
            )
          ),
          SubCell: (row) => (
            <>{row.row.values[CONTENT_FIELD_KEY.NAME]}</>
          )
        },

        // {
        //   Header: "Description",
        //   accessor: CONTENT_FIELD_KEY.DESCRIPTION,
        // },
        {
          Header: "Channels",
          accessor: CONTENT_FIELD_KEY.CHANNELS,
          Cell: ({ row, value }) => (
            <div className="d-flex">
              {
                console.log('console.logconsole.logListcontent'),
                console.log(value),
                console.log(row)
              }
              {value && value.map((item) => (
                <div className="position-relative me-2">
                  <Image
                    src={item.icon}
                    width="20"
                    className="position-absolute bottom-0 end-0"
                  />
                  <Image src={item.image} rounded width="40" />
                </div>
              ))}
            </div>
          ),
          SubCell: (row) => (
            <div className="d-flex">
              <div className="position-relative me-2">
                <Image
                  src={`/assets/images/${row.row.original.channel}.png`}
                  width="20"
                  className="position-absolute bottom-0 end-0"
                />
                <Image src={`/assets/images/${row.row.original.channel}.png`} rounded width="40" />
              </div>
            </div>
          )
        },
        {
          Header: "Status",
          accessor: CONTENT_FIELD_KEY.STATUS,
          className: "status",
          Cell: ({ row }) => {
            console.log('valuevalue123status', row.original[CONTENT_FIELD_KEY.STATUS])
            return (
              <>
                {
                  (row.original[CONTENT_FIELD_KEY.STATUS] === 'save_as_draft') && (
                    <span
                      className={`badge bg-${row.original[CONTENT_FIELD_KEY.STATUS]} mw-100 h-35 d-table-cell align-middle`}
                    >
                      Save as draft
                    </span>
                  )
                }
                
              </>
            );
          },
          SubCell: (row) => (
            <>
              <span
                className={`badge bg-${row.row.original.status} mw-100 h-35 d-table-cell align-middle text-capitalize`}
              >
                {row.row.original.status}
              </span>
            </>
          )
        },
        {
          Header: "Edit",
          accessor: CONTENT_FIELD_KEY.EDIT,
          Cell: ({ row }) => (
            console.log('rowrowEditEditEditEdit', row),
            <>
              {
                (row.original[CONTENT_FIELD_KEY.STATUS] === 'save_as_draft') && (
                  <button
                    className={`badge mw-100 h-35 d-table-cell align-middle btn btn-secondary border-0`}
                    onClick={(e) => this.handerEditContent(e, row.original)}
                    disabled={true}
                  >
                    Edit
                  </button>
                ) 
              }
            </>
            
          ),
          SubCell: () => null
        },
      ];

      return (
        <>
          {
            contents ? (
              tableStatus === PAGE_STATUS.LOADING ? (
                <Spinner />
              ) : (
                <>
                  <Table
                    rowData={contents}
                    tableRowHeader={tableRowHeader}
                    //onEdit={this.handerEditContent}
                    onSelect={this.handerSelectContent}
                    isFilter={true}
                    pagination={pagination}
                    pageSize={this.contentListViewModel.pageSize}
                    listViewModel={this.contentListViewModel}
                    searchFunction={this.contentListViewModel.searchContents}
                    dataFormFilter={dataFormFilter}
                    searchText="Search your posts"
                    classNameTable={"wr_content_list"}
                  ></Table>
                </>
              )
            ) : (
              <ComponentNoData />
            )
          }
        </>
      )
    }
  }
);

export default withContentViewModel(ContentsList);
