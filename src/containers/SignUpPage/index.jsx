import React from "react";
import { withTranslation } from "react-i18next";
import Select from "react-select";

import TitleAccount from "../../components/TitlePageAccount";
import "./index.scss";
import Line from "../../components/Line";
import ButtonNormal from "../../components/ButtonNormal";
import BannerLeft from "../../components/BannerLeft";
import Social from "../../components/Social";

/*const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];*/

const dataSlider = [
  {
    text:
      "The most complete, easy-to-use, and comprehensive reporting suite available. We use Easii.io at our digital marketing agency for all of our client campaign reporting, and the results have been remarkable!",
    title: "William White - CMO at Walmart",
  },
  {
    text:
      "The most complete, easy-to-use, and comprehensive reporting suite available. We use Easii.io at our digital marketing agency for all of our client campaign reporting, and the results have been remarkable! 1",
    title: "William White - CMO at Walmart",
  },
  {
    text:
      "The most complete, easy-to-use, and comprehensive reporting suite available. We use Easii.io at our digital marketing agency for all of our client campaign reporting, and the results have been remarkable! 2",
    title: "William White - CMO at Walmart",
  },
];

class Signuppage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  render() {
    const { t, i18n } = this.props;
    let { selectedOption } = this.state;
    return (
      <div className="row">
        <div className="col-4 bg-primary p-0">
          <BannerLeft dataSlider={dataSlider} />
        </div>
        <div className="col-8 d-flex flex-column justify-content-center align-items-center">
          <div className="d-block">
            <TitleAccount
              title={t("txt_welcome_to_our_easii")}
              title_below={t("txt_sign_up_to_getting_started")}
            />
            <Social />
            <Line text={t("txt_or_register_with")} />

            <form>
              <label className="form-label mb-3" htmlFor="username">
                {t("txt_username")} <span>*</span>
              </label>
              <input type="text" className="form-control mb-4" id="username" />

              <label className="form-label mb-3" htmlFor="email">
                {t("txt_email")} <span>*</span>
              </label>
              <input type="email" className="form-control mb-4" id="email" />

              <label className="form-label mb-3" htmlFor="password">
                {t("txt_password")} <span>*</span>
              </label>
              <input
                type="password"
                className="form-control mb-4"
                id="password"
              />

              {/*<label className="form-label mb-3">
                {t("txt_what_is_the_main_thing_you_want_to_manage")}
              </label>

              <Select
                className="mb-4"
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />*/}

              <ButtonNormal text="Sign up" />

              <div className="mt-3">
                {t("txt_you_agree_to_our")}{" "}
                <a href="#">{t("txt_terms_of_service")} </a> {t("txt_and")}{" "}
                <a href="#">{t("txt_privacy_policy")}</a>.
              </div>

              <a href="/login" className="d-flex justify-content-center mt-4">
                {t("txt_already_have_an_account")}
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Signuppage);
