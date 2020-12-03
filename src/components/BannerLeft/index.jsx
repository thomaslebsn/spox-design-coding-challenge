import React from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "./index.scss";

SwiperCore.use([Navigation, Pagination]);

class BannerLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { dataSlider } = this.props;
    return (
      <div className="wrapper_banner_left vh-100">
        <div className="content_banner_left d-flex h-100 justify-content-between flex-column">
          <a href="/" className="d-block">
            <img src="/assets/images/logo/logo-white.svg" alt="logo" />
          </a>
          <div className="wrapper_slider">
            <div className="wrapper_icon_slider">
              <img src="/assets/images/icon-quote.svg" alt="icon quote" />
            </div>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log()}
            >
              {dataSlider.map((value, key) => {
                return (
                  <SwiperSlide key={key}>
                    <div className="wrapper_text_slider">
                      <p className="text_slider">{value.text}</p>
                      <p className="title_slider">{value.title}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    );
  }
}

export default BannerLeft;
