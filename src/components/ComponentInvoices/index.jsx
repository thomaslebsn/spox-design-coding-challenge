import React from 'react';

class ComponentInvoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { data } = this.props;
    console.log(data);
    return (
      <div className="bg-white p-3">
        <div className="py-2 px-3 bg-blue">
          <div className="row">
            <div className="col-2">
              <span>Order ID</span>
            </div>
            <div className="col-2">
              <span>Plan</span>
            </div>
            <div className="col-2">
              <span>Amount</span>
            </div>
            <div className="col-2">
              <span>Date</span>
            </div>
            <div className="col-2 text-center">
              <span>Status</span>
            </div>
            <div className="col-2 text-center">
              <span>Receipt</span>
            </div>
          </div>
        </div>
        <div className="px-3">
          {data.map((value, key) => {
            return (
              <div key={key} className="row py-3 border-bottom-1 item_project">
                <div className="col-2">
                  <div className="d-flex align-items-center">
                    <span>{value.order_id}</span>
                  </div>
                </div>
                <div className="col-2">
                  <span>{value.subscription_plan_name}</span>
                </div>
                <div className="col-2">
                  <span>{value.amount}</span>
                </div>
                <div className="col-2">
                  <span>{value.paid_at}</span>
                </div>
                <div className="col-2 d-flex justify-content-center">
                  <span
                    className={`mw-100 h-35 fs-14 d-flex align-items-center justify-content-center rounded-2 bg-status-1`}
                  >
                    {value.status}
                  </span>
                </div>
                <div className="col-2 text-center">
                  <span>
                    <a href={value.receipt_url}>PDF</a>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ComponentInvoices;
