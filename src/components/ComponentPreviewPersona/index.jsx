import React, { useState, lazy, Component } from "react";

import { observer } from "mobx-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons/faEdit";

import SelectComponent from "../Select";

import { withPersonaViewModel } from "../../containers/PersonasPage/PersonaViewModels/PersonaViewModelContextProvider";

const data = [
  {
    image: "/assets/images/avatar-1.png",
    selectName: [
      { value: "Hieu", label: "Hieu - simple" },
      { value: "Hieu1", label: "Hieu - simple 1" },
      { value: "Hieu2", label: "Hieu - simple 2" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non odio eu neque vestibulum scelerisque. Donec tincidunt augue non libero blandit gravida nec pretium mi. Pellentesque lacus sapien, venenatis in molestie sed, accumsan non diam.",
    demographic: [
      {
        id: 0,
        title: "Name",
        text: "Yen",
      },
      {
        id: 1,
        title: "Age",
        text: 28,
      },
      {
        id: 2,
        title: "Gender",
        text: "Female",
      },
      {
        id: 3,
        title: "Location",
        text: "Hochiminh City, Vietnam",
      },
      {
        id: 4,
        title: "Job Title",
        text: "Founder, Vantay media",
      },
      {
        id: 5,
        title: "Sector",
        text: "Digital marketing",
      },
      {
        id: 6,
        title: "Marital Status",
        text: "Married",
      },
    ],
    information: [
      {
        id: 0,
        title: "Tools",
        text: "CRM, MailChimp, Google Produccts, MS offices",
        images: [],
      },
      {
        id: 1,
        title: "Website",
        text: "Local press, Marketing hub, Content Hub, Youtube",
        images: [],
      },
      {
        id: 2,
        title: "Vendor research",
        text: "Google search, online reviews",
        images: [],
      },
      {
        id: 3,
        title: "Social Networks",
        text: "",
        images: [
          "/assets/images/icon-nikon.png",
          "/assets/images/icon-nikon.png",
          "/assets/images/icon-nikon.png",
          "/assets/images/icon-nikon.png",
        ],
      },
    ],
  },
];

const ComponentPreviewPersona = observer(
  class ComponentPreviewPersona extends Component {
    previewPersonasListViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;

      console.log("viewModel preview");
      console.log(viewModel);

      this.previewPersonasListViewModel = viewModel
        ? viewModel.getPersonaFormViewModel()
        : null;

      console.log("this.previewPersonasListViewModel");
      console.log(this.previewPersonasListViewModel);

      this.state = {
        option: null,
      };
    }

    handleSelect = (selected) => {
      this.setState({
        option: selected,
      });
    };

    componentDidMount = () => {
      this.previewPersonasListViewModel.getPersona();
      console.log("this.previewPersonasListViewModel 2222");
      console.log(this.previewPersonasListViewModel.getPersona(698));
    };

    render() {
      return (
        <div>
          {data.map((value) => {
            return (
              <>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h3>Preview Persona</h3>
                  <a
                    href={void 0}
                    className="cursor-pointer text-decoration-none text-green"
                  >
                    <i className="">
                      <FontAwesomeIcon icon={faEdit} />
                    </i>
                    <span className="ms-1">Edit</span>
                  </a>
                </div>
                <SelectComponent
                  value={this.state.option}
                  onChange={this.handleSelect}
                  options={value.selectName}
                  className="text-green bg-white rounded-2 mb-3"
                  isBorder={true}
                  plColor="rgba(8, 18, 64, 0.8)"
                />
                <div className="text-center mb-2">
                  <img src={value.image} />
                </div>
                <p>{value.description}</p>
                <div>
                  <div className="bg-blue-3 py-2 px-3">Demographic</div>
                  <ul className="list-unstyled py-3">
                    {value.demographic.map((item, index) => {
                      return (
                        <li key={index} className="d-flex py-1">
                          <span className="fw-bold w-150">{item.title}</span>
                          <span className="flex-1">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <div className="bg-blue-3 py-2 px-3">
                    Sources of information
                  </div>
                  <ul className="list-unstyled py-3">
                    {value.information.map((item, index) => {
                      return (
                        <li key={index} className="d-flex py-1">
                          <span className="fw-bold w-150">{item.title}</span>
                          {item.images.length > 0 ? (
                            <span className="flex-1">
                              <ul className="list-unstyled d-flex post_list_images">
                                {item.images.map((i) => {
                                  return (
                                    <li className="me-2">
                                      <img src={i} className="img-avatar" />
                                    </li>
                                  );
                                })}
                              </ul>
                            </span>
                          ) : (
                            <span className="flex-1">{item.text}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            );
          })}
        </div>
      );
    }
  }
);

export default withPersonaViewModel(ComponentPreviewPersona);
