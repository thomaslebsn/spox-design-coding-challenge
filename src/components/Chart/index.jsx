import React from "react";
import Chart from "react-google-charts";

class ComponentChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="bg-white p-3">
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={[
            ['Year', 'Sales', 'Expenses', 'Profit', 'a'],
            ['Facebook', 1000, 400, 200, 100],
            ['Youtube', 1170, 460, 250, 800],
            ['Joomla', 660, 1120, 300, 700],
            ['Twitter', 1030, 540, 350, 50],
            ['Pinterest', 1030, 540, 350, 2000],
            ['Instagram', 1030, 540, 350, 1200],
            ['Linkedin', 1030, 540, 350, 600],
          ]}
          options={{
            chart: {
              title: 'Engagement / Posts Published'
            },
            legend: { position: 'bottom' , maxLines: 2},
            vAxis: {
              minValue: 0
            },
          }}
          // rootProps={{ 'data-testid': '2' }}
        />
      </div>
    );
  }
}

export default ComponentChart;
