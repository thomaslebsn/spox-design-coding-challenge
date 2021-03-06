import React from "react";

import SelectComponent from "../Select";

let data = [
  {
    name: "Persona",
    option: [
      { value: "persona1", label: "Persona 1" },
      { value: "persona2", label: "Persona 2" },
      { value: "persona3", label: "Persona 3" },
    ],
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
    name: "Projects",
    option: [
      { value: "projects1", label: "Projects 1" },
      { value: "projects2", label: "Projects 2" },
      { value: "projects3", label: "Projects 3" },
    ],
  },
  {
    name: "Campaigns",
    option: [
      { value: "campaigns1", label: "Campaigns 1" },
      { value: "campaigns2", label: "Campaigns 2" },
      { value: "campaigns3", label: "Campaigns 3" },
    ],
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

class ComponentFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueOption: "",
    };
  }

  handleSelect = (events, name, isMulti) => {
    console.log('handleSelect');
    console.log(events);

    let values = null;

    if (events)
    {
      if (isMulti === true) {
        values = events.map(e => {
          return e.value;
        })
      } else {
        values = events.value
      }
    }
  
    console.log(values);
    console.log(JSON.stringify(values));

    this.setState({
      [name]: values,
    });

    if (isMulti)
    {
      name = name + '[]';
    }

    this.props.setGlobalFilter(
      {
        [name]: values
      }
    )
  };

  render() {
    data = this.props.dataFormFilter.length > 0 ? this.props.dataFormFilter : data
    return (
      <div className="d-flex">
        {data.map((item, key) => {
          return (
            <div key={key} className="flex-1 px-1">
              <SelectComponent
                placeholder={item.name}
                name={item.name}
                onChange={(e) => this.handleSelect(e, item.name, item.isMulti, item.type)}
                options={item.option}
                className="text-green bg-white rounded-2 text-capitalize"
                isBorder={true}
                plColor="rgba(8, 18, 64, 0.8)"
                isMulti={item.isMulti}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ComponentFilter;
