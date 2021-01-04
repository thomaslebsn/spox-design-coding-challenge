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
    }

    componentDidMount() {
      this.contentListViewModel.initializeData();
    }

    handerEditContent = (row) => {
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
          return item.id;
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
    };

    render() {
      console.log("[Quick Edit Product] - re-render .........");
      const { tableStatus, contents } = this.contentListViewModel;

      const tableRowHeader = [
        {
          Header: "Name",
          accessor: CONTENT_FIELD_KEY.NAME,
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
              <span className={`badge ${value.className}`}>{value.text}</span>
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
          onEdit={this.handerEditContent}
          onSelect={this.handerSelectContent}
        ></Table>
      );
    }
  }
);

export default withContentViewModel(ContentsList);
