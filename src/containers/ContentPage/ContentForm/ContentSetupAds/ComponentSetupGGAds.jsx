import React, { Component, lazy } from 'react';
import { Form } from 'react-bootstrap';
import ComponentPreviewDevice from '../../../../components/ComponentPreviewDevice';
import DatePickerDay from '../../../../components/ComponentSchedule/DatePickerDay';
import DatePickerTime from '../../../../components/ComponentSchedule/DatePickerTime';
import Checkbox from '../../../../components/Checkbox';
import SelectComponent from '../../../../components/Select';
import ComponentAdExtensions from '../../../../components/ComponentAdExtensions';

const facebookFanpage = [
  { value: '01', label: 'Conversion value' },
  { value: '02', label: 'Conversion value 2' },
  { value: '03', label: 'Conversion value 3' },
];

class ComponentSetupGGAds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDateTime: new Date(),
      timeDate: new Date(),
      isEndDate: false,
      isConversions: "conversions_use",
      isRotation: "rotation_1"
    }
  }

  handleEndDay = () => {
    this.setState({
      isEndDate: !this.state.isEndDate,
    });
  };

  handleConversions = (name) => {
    this.setState({
      isConversions: name
    })
  }

  handleRotation = (name) => {
    this.setState({
      isRotation: name
    })
  }

  render() {
    let {
      startDateTime,
      timeDate,
      isEndDate,
      isConversions,
      isRotation
    } = this.state;

    let { FORM_FIELD_TYPE, CONTENT_FIELD_KEY, formPropsData, nextStep2Ads } = this.props;
    return (
      <div>
        <div className="pt-3">
          {
            !nextStep2Ads ? (
              <div className="row">
                <div className="col-7">
                  <h5>New text ad</h5>
                  <div className="mb-3">
                    <p className="mb-2 d-flex align-items-center justify-content-between opacity-75">
                      <span>Final URL</span>
                    </p>
                    <Form.Control
                      as="input"
                      type={'text'}
                      id={'name'}
                      // onChange={field.changed ?? undefined}
                      className={`form-control`}
                    />
                  </div>
                  <div className="mb-3">
                    <p className="mb-2 d-flex align-items-center justify-content-between opacity-75">
                      <span>Headline 1</span>
                      <span>0/30</span>
                    </p>
                    <Form.Control
                      as="input"
                      type={'text'}
                      id={'name'}
                      // onChange={field.changed ?? undefined}
                      className={`form-control`}
                    />
                  </div>
                  <div className="mb-3">
                    <p className="mb-2 d-flex align-items-center justify-content-between opacity-75">
                      <span>Headline 2</span>
                      <span>0/30</span>
                    </p>
                    <Form.Control
                      as="input"
                      type={'text'}
                      id={'name'}
                      // onChange={field.changed ?? undefined}
                      className={`form-control`}
                    />
                  </div>
                  <div className="mb-3">
                    <p className="mb-2 d-flex align-items-center justify-content-between opacity-75">
                      <span>Headline 3</span>
                      <span>0/30</span>
                    </p>
                    <Form.Control
                      as="input"
                      type={'text'}
                      id={'name'}
                      // onChange={field.changed ?? undefined}
                      className={`form-control`}
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-8">
                      <div className="">
                        <p className="mb-2 d-flex align-items-center justify-content-between opacity-75">
                          <span>Display path</span>
                          <span>0/30</span>
                        </p>
                        <div className="row align-items-center">
                          <div className="col-4 opacity-75">
                            www.easii.io /
                          </div>
                          <div className="col-8">
                            <Form.Control
                              as="input"
                              type={'text'}
                              id={'name'}
                              // onChange={field.changed ?? undefined}
                              className={`form-control`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="">
                        <p className="mb-2 d-flex align-items-center justify-content-end opacity-75">
                          <span>0/30</span>
                        </p>
                        <Form.Control
                          as="input"
                          type={'text'}
                          id={'name'}
                          // onChange={field.changed ?? undefined}
                          className={`form-control`}
                        />
                    </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="mb-2 d-flex align-items-center justify-content-between opacity-75">
                      Description 1
                    </p>
                    <textarea className="form-control border-1 rounded-2" rows="3"></textarea>
                  </div>
                  <div className="mb-3">
                    <p className="mb-2 d-flex align-items-center justify-content-between opacity-75">
                      Description 2
                    </p>
                    <textarea className="form-control border-1 rounded-2" rows="3"></textarea>
                  </div>
                </div>
                <div className="col-5">
                  <ComponentPreviewDevice />
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-7">
                  <div className="mb-3">
                    <p className="mb-2 d-flex align-items-center justify-content-between opacity-75">
                      <span>Campaign name</span>
                    </p>
                    <Form.Control
                      as="input"
                      type={'text'}
                      id={'name'}
                      // onChange={field.changed ?? undefined}
                      className={`form-control`}
                    />
                  </div>
                  <div className="mb-3">
                    <div>
                      <p className="mb-2 opacity-75">Start Date</p>
                      <div className="d-flex mb-3 wr_item_schedule wr_item_schedule_transparent">
                        <div className="item">
                          <DatePickerDay field={startDateTime} />
                        </div>
                        <div className="item">
                          <DatePickerTime field={timeDate} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 d-flex">
                        <Checkbox checked={isEndDate} onCheckBoxChange={this.handleEndDay} /> End Date
                      </p>
                      {isEndDate && (
                        <div className="d-flex mb-3 wr_item_schedule wr_item_schedule_transparent">
                          <div className="item">
                            <DatePickerDay field={startDateTime} />
                          </div>
                          <div className="item">
                            <DatePickerTime field={timeDate} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <h5>Budget and bidding</h5>
                    <p className="opacity-75">Define how much you want to spend and how you want to spend it</p>
                    <div className="row">
                      <div className="col-6">
                        <p className="mb-2 opacity-75">Budget</p>
                        <Form.Control
                          as="input"
                          type={'text'}
                          id={'name'}
                          // onChange={field.changed ?? undefined}
                          className={`form-control`}
                        />
                      </div>
                      <div className="col-6">
                        <p className="mb-2 opacity-75">Bidding</p>
                        <SelectComponent
                          name="numbers"
                          onChange={this.handleSelect}
                          options={facebookFanpage}
                          className="text-green bg-white radius-end-0"
                          isBorder={true}
                          plColor="rgba(8, 18, 64, 0.8)"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 opacity-75">Conversions</p>
                    <p className="mb-2 text-blue-0 opacity-75">Select which conversations are in the 'Conversions' column for this campaign and used for Smart Bidding</p>
                    <div>
                      <p className="mb-2 d-flex">
                        <Checkbox checked={isConversions === "conversions_use" ? true : false} onCheckBoxChange={(e) => this.handleConversions("conversions_use")} /> <span className="opacity-75">Use the account-level "Include in 'Conversions" settings</span>
                      </p>
                      <p className="d-flex">
                        <Checkbox checked={isConversions === "conversions_choose" ? true : false} onCheckBoxChange={(e) => this.handleConversions("conversions_choose")} /> <span className="opacity-75">Choose conversion actions for this campaign</span>
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="mb-2 opacity-75">Ad rotation</p>
                    <p className="mb-2 text-blue-0 opacity-75">Show ads that are expected to get more clicks or conversions. Recommended for most advertisers</p>
                    <div>
                      <p className="mb-3 d-flex">
                        <Checkbox checked={isRotation === "rotation_1" ? true : false} onCheckBoxChange={(e) => this.handleRotation("rotation_1")} /> <span className="opacity-75">Optimize: Prefer best performing ads</span>
                      </p>
                      <p className="mb-3 d-flex">
                        <Checkbox checked={isRotation === "rotation_2" ? true : false} onCheckBoxChange={(e) => this.handleRotation("rotation_2")} /> <span className="opacity-75">Do not optimize: Rotate ads indefinitely</span>
                      </p>
                      <p className="mb-3 d-flex">
                        <Checkbox checked={isRotation === "rotation_3" ? true : false} onCheckBoxChange={(e) => this.handleRotation("rotation_3")} /> <span className="opacity-75">Optimize for conversions (Not supported)</span>
                      </p>
                      <p className="mb-0 d-flex">
                        <Checkbox checked={isRotation === "rotation_4" ? true : false} onCheckBoxChange={(e) => this.handleRotation("rotation_4")} /> <span className="opacity-75">Rotate evenly (Not supported)</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h5>Ad extensions</h5>
                    <p>Get up to 15% higher clickthrough rate by showing additional information on your ads</p>
                    <ComponentAdExtensions />
                  </div>
                </div>
                <div className="col-5">
                  <ComponentPreviewDevice />
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default ComponentSetupGGAds;
