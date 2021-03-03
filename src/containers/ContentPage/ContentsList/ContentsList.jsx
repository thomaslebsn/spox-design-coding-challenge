import React, { Component } from "react";

import history from "../../../routes/history";

import PAGE_STATUS from "../../../constants/PageStatus";
import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";

import Table from "../../../components/Table";

import { observer } from "mobx-react";
import { withContentViewModel } from "../ContentViewModels/ContentViewModelContextProvider";

import Spinner from "../../../components/Spinner";
import { Image } from "react-bootstrap";

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
        {
          name: "persona",
          option: this.contentsFilterFormViewModel.personaMasterData,
          isMulti: true,
        },
        {
          name: "Organisation",
          option: [
            { value: "organisation1", label: "Organisation 1" },
            { value: "organisation2", label: "Organisation 2" },
            { value: "organisation3", label: "Organisation 3" },
          ],
        },
        {
          name: "projects",
          option: [
            { value: "projects1", label: "Projects 1" },
            { value: "projects2", label: "Projects 2" },
            { value: "projects3", label: "Projects 3" },
          ],
        },
        {
          name: "campaigns",
          option: this.contentsFilterFormViewModel.campaignsMasterData,
          isMulti: true,
        },
        {
          name: "Content Type",
          option: [
            { value: "contentType1", label: "Content Type 1" },
            { value: "contentType2", label: "Content Type 2" },
            { value: "contentType3", label: "Content Type 3" },
          ],
        },
        {
          name: "Status",
          option: [
            { value: "status1", label: "Status 1" },
            { value: "status2", label: "Status 2" },
            { value: "status3", label: "Status 3" },
          ],
        },
        {
          name: "Assigness",
          option: [
            { value: "assigness1", label: "Assigness 1" },
            { value: "assigness2", label: "Assigness 2" },
            { value: "assigness3", label: "Assigness 3" },
          ],
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
          Header: "Name",
          accessor: CONTENT_FIELD_KEY.NAME,
          Cell: ({ row }) => (
            console.log("row.original", row),
            (
              <div {...row.getToggleRowExpandedProps()} className="d-flex">
                <span
                  className="text-black opacity-75"
                  onClick={(e) => this.handerEditContent(e, row.original)}
                >
                  {row.original[CONTENT_FIELD_KEY.NAME]}
                </span>
              </div>
            )
          ),
        },

        {
          Header: "Description",
          accessor: CONTENT_FIELD_KEY.DESCRIPTION,
        },
        {
          Header: "Channels",
          accessor: CONTENT_FIELD_KEY.CHANNELS,
          Cell: ({ value }) => (
            <div className="d-flex">
              {value.map((item) => (
                <div className="position-relative me-2">
                  <Image
                    src={item.icon}
                    width="20"
                    className="position-absolute bottom-0 end-0"
                  />
                  <Image src={item.image} rounded width="50" />
                </div>
              ))}
            </div>
          ),
        },
        {
          Header: "Status",
          accessor: CONTENT_FIELD_KEY.STATUS,
          className: "status",
          Cell: ({ value }) => {
            return (
              <span
                className={`badge ${value.className} mw-100 h-35 d-table-cell align-middle`}
              >
                {value.text}
              </span>
            );
          },
        },
      ];

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <Table
          rowData={contents}
          tableRowHeader={tableRowHeader}
          //onEdit={this.handerEditContent}
          onSelect={this.handerSelectContent}
          isFilter={true}
          pagination={pagination}
          listViewModel={this.contentListViewModel}
          searchFunction={this.contentListViewModel.searchContents}
          dataFormFilter={dataFormFilter}
        ></Table>
      );
    }
  }
);

export default withContentViewModel(ContentsList);
