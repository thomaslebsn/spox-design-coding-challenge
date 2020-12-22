import React from "react";
import { withTranslation } from "react-i18next";

import ComponentHeaderPage from "../../components/ComponentHeaderPage";
import ChannelAccordion from "../../components/ChannelAccordion";

const data = [
  {
    key: 1,
    images: "assets/images/facebook.png",
    title: "Facebook",
    dataList: [
      {
        images: "assets/images/icon-adidas.png",
        title: "Food Network",
        chart: [
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Campaign",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Followers",
            number: "-15",
            isNumber: false,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Engagement",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          }
        ]
      },
      {
        images: "assets/images/icon-levis.png",
        title: "Food Network",
        chart: [
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Campaign",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "20",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          }
        ]
      },
      {
        images: "assets/images/icon-nikon.png",
        title: "Food Network",
        chart: [
          {
            title: "Posts",
            number: "-15",
            isNumber: false,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "15",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          }
        ]
      }
    ]
  },
  {
    key: 2,
    images: "assets/images/instagram.png",
    title: "Instagram",
    dataList: [
      {
        images: "assets/images/icon-adidas.png",
        title: "Food Network",
        chart: [
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          }
        ]
      },
      {
        images: "assets/images/icon-levis.png",
        title: "Food Network",
        chart: [
          {
            title: "Posts",
            number: "-20",
            isNumber: false,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          }
        ]
      },
      {
        images: "assets/images/icon-nikon.png",
        title: "Food Network",
        chart: [
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          },
          {
            title: "Posts",
            number: "5",
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ]
          }
        ]
      }
    ]
  }
]

class ChannelsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleCreate = () => {

  }

  render() {
    const { t, i18n } = this.props;

    return (
      <div className="py-4 px-3">
        <div className="mb-3">
          <ComponentHeaderPage
            title={"Channel Statistics"}
            textBtn={"Add channels"}
            handleCreate={this.handleCreate}
          />
        </div>
        <div>
          <ChannelAccordion data={data}/>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(ChannelsPage);
