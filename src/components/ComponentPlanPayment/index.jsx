import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";

class ComponentPlanPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {handleChangePlan, handleCancelPlan, subscriptionDetail} = this.props;
    return (
      <div>
        <div className="d-flex">
          <div className="item_plan_payment p-0 w-350 px-3 pe-2">
            <div
              className="border-1 rounded-2 p-3 object-fit-cover position-relative bg-green-2 text-white border-white"
              style={{backgroundImage: `url("/assets/images/bg-plan.png")`}}
            >
              <p className="mb-3">Current subscription plan</p>
              <div className="mb-3">
                <p className="mb-0 text-uppercase">{subscriptionDetail.name}</p>
                <p className="mb-0">
                  <span className="fw-medium fs-4">${subscriptionDetail.plan_detail.amount}</span>
                  <span>.00</span>
                </p>
              </div>
              <button className="btn btn-success" onClick={handleChangePlan}>
                <i className="me-2">
                  <FontAwesomeIcon icon={faArrowUp}/>
                </i>
                <span>Change Plan</span>
              </button>
            </div>
          </div>
          <div className="item_plan_payment p-0 w-350 px-3 ps-2">
            <div className="border-1 rounded-2 p-3 position-relative">
              <img
                src="/assets/images/icon-plan.png"
                style={{width: "60px", height: "45px"}}
                className="position-absolute top-0 end-0 mt-4 me-3"
              />
              <p className="mb-3">Next payment</p>
              <div className="mb-3">
                <p className="mb-0">
                  <span className="fw-medium fs-4">${subscriptionDetail.next_payment_amount}</span>
                  <span>.00</span>
                </p>
                <p className="mb-0 opacity-75">on {subscriptionDetail.next_payment_date}</p>
              </div>
              <button
                className="btn border-da-1 border-red text-red-1"
                onClick={handleCancelPlan}
              >
                <i className="me-2">
                  <FontAwesomeIcon icon={faTimes}/>
                </i>
                <span>Cancel Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ComponentPlanPayment;