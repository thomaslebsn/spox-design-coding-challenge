import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import { Image } from 'react-bootstrap';
import { withContentViewModel } from '../ContentViewModels/ContentViewModelContextProvider';

import './index.scss';
import { notify } from '../../../components/Toast';

const ContentItemDetail = observer(
  class ContentItemDetail extends Component {
    contentListViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log('ContentList - Debug View Model');
      console.log(viewModel);
      this.contentListViewModel = viewModel ? viewModel.getContentListViewModel() : null;

      console.log('After binding class content detail');
      console.log(this.contentListViewModel);
    }

    componentDidMount = () => {
      let { match } = this.props;
      if (match) {
        this.contentListViewModel.getContentItemDetail(match.params.id);
        this.contentListViewModel.getContentByIdExpanded(match.params.id);
      }
    };

    render() {
      let { getDataContentItemChannel, subRowDataTable } = this.contentListViewModel;
      let data = getDataContentItemChannel ? getDataContentItemChannel : null;
      let getDataParse = data ? JSON.parse(data.data) : null;
      let getPublishingType = data ? JSON.parse(data.publishing_type) : null;
      let getNameChannel = getDataParse && Object.keys(getDataParse.channels);
      let subDataContentItemDetail = subRowDataTable ? subRowDataTable : null;

      return (
        <>
          <div className="bg-white p-3 rounded-3">
            <table className={`w-100 mb-4 `}>
              <thead>
                <tr className="bg-blue">
                  <th colspan="1" role="columnheader" className="fw-normal px-2 py-3 flex-1">
                    Title
                  </th>
                  <th colspan="1" role="columnheader" className="fw-normal px-2 py-3 flex-1">
                    Channels
                  </th>
                  <th colspan="1" role="columnheader" className="fw-normal px-2 py-3 flex-1">
                    Status
                  </th>
                  {/* <th colspan="1" role="columnheader" className="fw-normal px-2 py-3 flex-1">Edit</th> */}
                </tr>
              </thead>
              <tbody>
                <tr className="border-bottom-1 cursor-pointer">
                  <td className="fw-normal px-2 py-3">{data && data.title}</td>
                  <td className="fw-normal px-2 py-3">
                    <div className="d-flex">
                      {getNameChannel &&
                        getNameChannel.map((value, key) => {
                          return (
                            <div key={key} className="position-relative me-2">
                              <Image
                                src={`/assets/images/${value}.png`}
                                width="20"
                                className="position-absolute bottom-0 end-0"
                              />
                              <Image src={`/assets/images/${value}.png`} rounded width="40" />
                            </div>
                          );
                        })}
                    </div>
                  </td>
                  <td className="fw-normal px-2 py-3">
                    {getPublishingType === 'save_as_draft' && (
                      <div className="d-flex">
                        <span
                          className={`badge bg-${getPublishingType} mw-100 h-35 d-flex align-items-center justify-content-center text-capitalize`}
                        >
                          Save as draft
                        </span>
                      </div>
                    )}
                  </td>
                  {/* <td className="fw-normal px-2 py-3">
                    {
                      (getPublishingType === 'save_as_draft') && (
                        <button
                          className={`badge mw-100 h-35 d-table-cell align-middle btn btn-secondary border-0 p-0`}
                          disabled={true}
                        >
                          Edit
                        </button>
                      ) 
                    }
                  </td> */}
                </tr>
                {subDataContentItemDetail &&
                  subDataContentItemDetail.map((value, key) => {
                    return (
                      <tr className="border-bottom-1">
                        <td className="fw-normal px-2 py-3">{value.name}</td>
                        <td className="fw-normal px-2 py-3">
                          <div className="d-flex">
                            <div key={key} className="position-relative me-2">
                              <Image
                                src={`/assets/images/${value.channel}.png`}
                                width="20"
                                className="position-absolute bottom-0 end-0"
                              />
                              <Image
                                src={`/assets/images/${value.channel}.png`}
                                rounded
                                width="40"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="fw-normal px-2 py-3 d-flex">
                          {!(getPublishingType === 'save_as_draft') && (
                            <span
                              className={`badge bg-${value.status} mw-100 h-35 d-flex align-items-center justify-content-center text-capitalize`}
                            >
                              {value.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      );
    }
  }
);
export default withContentViewModel(ContentItemDetail);
