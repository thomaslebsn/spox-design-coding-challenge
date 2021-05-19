import React from 'react';
import SelectComponent from '../../../../components/Select';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
const fakeOptions = [
  { value: '01', label: 'option 1' },
  { value: '02', label: 'option 2' },
];
const ComponentMessengerAdsModal = () => {
  return (
    <>
      <hr className="modal_bar_messenger_ads" />
      <div className="my-3">
        <div className="row">
          <div className="col-7">
            <h4 className="mb-3">Greeting</h4>
            <span className="">Welcome people to conversation after they tap on your ad.</span>
            <div className="my-3 w-35">
              <SelectComponent
                name="numbers"
                placeholder={'Text Only'}
                options={fakeOptions}
                className="text-green bg-white radius-end-0"
                isBorder={true}
                plColor="rgba(8, 18, 64, 0.8)"
              />
            </div>
            <Form.Control as="textarea" rows={3} className="mt-3" />
            <h4 className="my-3">Customer Actions</h4>
            <span className="">
              Suggest questions or replies for customers to tap, or use a button to send people to
              your site.
            </span>
            <Form.Control as="textarea" rows={3} className="mt-3" />
            <div className="my-3 w-35">
              <SelectComponent
                name="numbers"
                placeholder={'Quick Replies'}
                options={fakeOptions}
                className="text-green bg-white radius-end-0"
                isBorder={true}
                plColor="rgba(8, 18, 64, 0.8)"
              />
            </div>
            <div className="border-1 px-3 pt-3 my-3">
              <div className="mb-3">
                <h6 className="mb-3">Quick Reply #1</h6>
                <Form.Control
                  as="input"
                  type={'text'}
                  id={'name'}
                  // onChange={field.changed ?? undefined}
                  className={`form-control`}
                />
              </div>
              <div className="mb-3">
                <h6 className="mb-3">Automated Response</h6>
                <SelectComponent
                  name="numbers"
                  placeholder={'Text Only'}
                  options={fakeOptions}
                  className="text-green bg-white radius-end-0 mb-3"
                  isBorder={true}
                  plColor="rgba(8, 18, 64, 0.8)"
                />
                <SelectComponent
                  name="numbers"
                  placeholder={'Text Only'}
                  options={fakeOptions}
                  className="text-green bg-white radius-end-0"
                  isBorder={true}
                  plColor="rgba(8, 18, 64, 0.8)"
                />
              </div>
            </div>
            <div className="small">
              <i className="text-success fa-sm">
                <FontAwesomeIcon icon={faPlusCircle} />
              </i>
              <span className="text-success ps-1 ">Add a Quick Reply</span>
            </div>
          </div>
          <div className="col-5">
            <h4>Preview</h4>
            <div className="mt-3 bg-light h-50"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ComponentMessengerAdsModal;
