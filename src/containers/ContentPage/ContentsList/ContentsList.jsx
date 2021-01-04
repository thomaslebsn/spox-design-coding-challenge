import React, { Component } from "react";

import history from "../../../routes/history";

import PAGE_STATUS from "../../../constants/PageStatus";
import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";

import Table from "../../../components/Table";

import { observer } from "mobx-react";
import { withContentViewModel } from "../ContentViewModels/ContentViewModelContextProvider";

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
      const {
        tableRowHeader,
        tableStatus,
        contents,
      } = this.contentListViewModel;
      console.log(contents);
      return tableStatus === PAGE_STATUS.LOADING ? (
        <div>Load</div>
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
