import React from 'react';
import Chart from "react-google-charts";

class ChartLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let { data } = this.props;
    return (
      <>
      {
        data.map((item, key) => {
          return (
            <div key={key} className="col-3">
              <div className="position-relative bg-gray-2 py-2 px-3 rounded-2">
                <p className="mb-0 d-flex align-items-center">
                  <span>{item.title}</span>
                  <span className={`${item.isNumber ? "text-green" : "text-red-2"}  ms-2`}>{item.number}%</span>
                </p>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="fs-2 mb-0 text-blue-0 opacity-75 fw-bold lh-1">150</p>
                  <div style={{width: "68px", height: "26px"}}>
                    <Chart
                      width={"100%"}
                      height={"100%"}
                      chartType="LineChart"
                      loader={<div>Loading Chart</div>}
                      data={item.dataChart}
                      options={{
                        chartArea: { 
                          width: "100%",
                          height: "100%",
                          backgroundColor: {
                            fill:'transparent',
                            stroke: 'transparent',
                            strokeWidth: 0
                          }
                        },
                        series: {
                          0: { color: item.isNumber ? "#16B979" : "#FF2366" },
                        },
                        legend: { 
                          position: "none"
                        },
                        vAxis: {
                          baselineColor: "transparent",
                          gridlines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                          }
                        },
                        hAxis: {
                          textPosition: 'none',
                          baselineColor: "transparent",
                          gridlines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                          }
                        },
                        is3D: true,
                        backgroundColor: {
                          fill:'transparent',
                          stroke: 'transparent',
                          strokeWidth: 5
                        }
                      }}
                      rootProps={{ 'data-testid': '1' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
      </>
    )
  }
}
export default ChartLine;