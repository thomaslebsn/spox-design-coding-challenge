import React, { Component, lazy } from 'react';
import { Form } from 'react-bootstrap';
import { renderingGroupFieldHandler } from '../../../../utils/form';
import SelectComponent from '../../../../components/Select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons/faEdit';
import { faImage } from '@fortawesome/free-regular-svg-icons/faImage';

import './index.scss';

const facebookFanpage = [
  { value: '01', label: 'redWEB Fanpage' },
  { value: '02', label: 'redWEB Fanpage 2' },
  { value: '03', label: 'redWEB Fanpage 3' },
];

class ComponentSetupFBIAds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trafficCheck: 'traffic_website',
      formatCheck: 'format_single',
      destinationCheck: 'destination_website',
    };
  }

  handleRadioTraffic = (name) => {
    this.setState({
      trafficCheck: name,
    });
  };

  handleRadioFormat = (name) => {
    this.setState({
      formatCheck: name,
    });
  };

  handleRadioDestination = (name) => {
    this.setState({
      destinationCheck: name,
    });
  };

  render() {
    let { trafficCheck, formatCheck, destinationCheck } = this.state;
    let { FORM_FIELD_TYPE, CONTENT_FIELD_KEY, formPropsData } = this.props;

    return (
      <div className="pt-3">
        <div className="row">
          <div className="col-4">
            <Form key={Math.random(40, 200)}>
              <div className="mb-3">
                <h5>Ad Name</h5>
                <Form.Control
                  as="input"
                  type={'text'}
                  id={'name'}
                  // onChange={field.changed ?? undefined}
                  className={`form-control`}
                />
              </div>
              <div className="mb-3">
                <h5>Identity</h5>
                <div>
                  <div className="mb-2">
                    <p className="mb-2">Facebook page</p>
                    <SelectComponent
                      name="numbers"
                      onChange={this.handleSelect}
                      options={facebookFanpage}
                      className="text-green bg-white"
                      isBorder={true}
                      plColor="rgba(8, 18, 64, 0.8)"
                    />
                  </div>
                  <div>
                    <p className="mb-2">Instagram Account</p>
                    <SelectComponent
                      name="numbers"
                      onChange={this.handleSelect}
                      options={facebookFanpage}
                      className="text-green bg-white"
                      isBorder={true}
                      plColor="rgba(8, 18, 64, 0.8)"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <h5>Traffic</h5>
                <p>
                  Choose where you want to drive traffic. You'll enter more details about the
                  destination later.
                </p>
                <div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="traffic_website"
                      checked={trafficCheck === 'traffic_website' ? true : false}
                      name="traffic_website"
                      onClick={() => this.handleRadioTraffic('traffic_website')}
                    />
                    <label className="form-check-label" htmlFor="traffic_website">
                      Website
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="traffic_messenger"
                      checked={trafficCheck === 'traffic_messenger' ? true : false}
                      name="traffic_messenger"
                      onClick={() => this.handleRadioTraffic('traffic_messenger')}
                    />
                    <label className="form-check-label" htmlFor="traffic_messenger">
                      Messenger
                    </label>
                    <p className="mb-0 text-blue-0 opacity-50 fs-14">
                      Send people from ads into Messenger conversations with your business. Lorem
                      ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                      euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    </p>
                  </div>
                  {trafficCheck === 'traffic_messenger' && (
                    <button className="btn btn btn-success py-2 mt-3">
                      <i className="text-white me-1">
                        <FontAwesomeIcon icon={faEdit} />
                      </i>
                      <span>Edit</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <h5 className="mb-3">Ad Setup</h5>
                <SelectComponent
                  name="ad_Setup"
                  onChange={this.handleSelect}
                  options={facebookFanpage}
                  className="text-green bg-white"
                  isBorder={true}
                  plColor="rgba(8, 18, 64, 0.8)"
                />
              </div>
              <div className="mb-3">
                <h6>Format</h6>
                <p className="mb-3 text-blue-0 opacity-50 fs-14">
                  Choose how you'd like to structure your ad.
                </p>
                <div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="format_single"
                      checked={formatCheck === 'format_single' ? true : false}
                      name="format_single"
                      onClick={() => this.handleRadioFormat('format_single')}
                    />
                    <label className="form-check-label" htmlFor="format_single">
                      Single Image or Video
                    </label>
                    <p className="mb-0 text-blue-0 opacity-50 fs-14">
                      One image or video, or a slideshow with multiple images
                    </p>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="format_carousel"
                      checked={formatCheck === 'format_carousel' ? true : false}
                      name="format_carousel"
                      onClick={() => this.handleRadioFormat('format_carousel')}
                    />
                    <label className="form-check-label" htmlFor="format_carousel">
                      Carousel
                    </label>
                    <p className="mb-0 text-blue-0 opacity-50 fs-14">
                      2 or more scrollable images or videos
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <h5>Ad Creative</h5>
                <p>
                  Select the media, text and destination for your ad. You can also customize your
                  media and text each placement.
                </p>
                <div>
                  <div className="mb-3">
                    <p className="mb-2">Media</p>
                    <button className="btn btn btn-success py-2">
                      <i className="text-white me-1">
                        <FontAwesomeIcon icon={faImage} />
                      </i>
                      <span>Add Media</span>
                    </button>
                  </div>
                  <div className="mb-3">
                    <p className="mb-2">Primary Text</p>
                    <textarea className="form-control border-1 rounded-2" rows="3"></textarea>
                  </div>
                  <div className="mb-3">
                    <p className="mb-2">Headline</p>
                    <Form.Control
                      as="input"
                      type={'text'}
                      id={'name'}
                      // onChange={field.changed ?? undefined}
                      className={`form-control`}
                    />
                  </div>
                  <div className="mb-3">
                    <p className="mb-2">Description</p>
                    <textarea className="form-control border-1 rounded-2" rows="3"></textarea>
                  </div>
                  <div className="mb-3">
                    <h6 className="mb-3">Destination</h6>
                    <div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="destination_website"
                          checked={destinationCheck === 'destination_website' ? true : false}
                          name="destination_website"
                          onClick={() => this.handleRadioDestination('destination_website')}
                        />
                        <label className="form-check-label" htmlFor="destination_website">
                          Website
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="destination_facebook_event"
                          checked={destinationCheck === 'destination_facebook_event' ? true : false}
                          name="destination_facebook_event"
                          onClick={() => this.handleRadioDestination('destination_facebook_event')}
                        />
                        <label className="form-check-label" htmlFor="destination_facebook_event">
                          Facebook Event
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="destination_phone_call"
                          checked={destinationCheck === 'destination_phone_call' ? true : false}
                          name="destination_phone_call"
                          onClick={() => this.handleRadioDestination('destination_phone_call')}
                        />
                        <label className="form-check-label" htmlFor="destination_phone_call">
                          Phone Call
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <p className="mb-0">Website URL</p>
                        <a href="#" className="text-green">
                          Preview URL
                        </a>
                      </div>
                      <Form.Control
                        as="input"
                        type={'text'}
                        id={'name'}
                        // onChange={field.changed ?? undefined}
                        className={`form-control`}
                      />
                    </div>
                    <div className="mb-3">
                      <p>Display Link</p>
                      <Form.Control
                        as="input"
                        type={'text'}
                        id={'name'}
                        // onChange={field.changed ?? undefined}
                        className={`form-control`}
                      />
                    </div>
                    <div className="mb-3">
                      <p>Call to Action</p>
                      <SelectComponent
                        name="ad_Setup"
                        onChange={this.handleSelect}
                        options={facebookFanpage}
                        className="text-green bg-white"
                        isBorder={true}
                        plColor="rgba(8, 18, 64, 0.8)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <div className="col-8">
            <div className="p-3 rounded-2 border-start-5 border-1 wr_review_errors">
              <h5 className="text-blue-0 mb-2 border-bottom-1 pb-2">Review 1 Errors</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentSetupFBIAds;
