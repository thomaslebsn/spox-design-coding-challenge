import React from "react";
import { withTranslation } from "react-i18next";
import SimpleReactValidator from "simple-react-validator";
import TitleAccount from "../../components/TitlePageAccount";

import "./index.scss";

import Line from "../../components/Line";
import ButtonNormal from "../../components/ButtonNormal";
import Checkbox from "../../components/Checkbox";
import BannerLeft from "../../components/BannerLeft";
import Social from "../../components/Social";

import { login } from "../../auth";

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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", remember: false };

    this.validator = new SimpleReactValidator();

    this.usernameInput = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.usernameInput.current.focus();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    if (this.validator.allValid()) {
      console.log("[is Form Valid]");

      login(this.state);   
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
      return false;
    }
  }

  onKeyPress = (e) => {
    if (e.which === 13) {
      this.handleSubmit();
    }
  };

  render() {
    const { t, i18n } = this.props;

    console.log("[LoginPage] render...");

    return (
      <div className="row">
        <div className="col-4 bg-primary p-0">
          <BannerLeft dataSlider={dataSlider} />
        </div>
        <div className="col-8 d-flex flex-column justify-content-center align-items-center ">
          <div className="d-block">
            <TitleAccount
              title={t("txt_welcome_to_easii")}
              title_below={t("txt_sign_in_to_see_latest_updates")}
            />

            <Social />

            <Line text={t("txt_or_sign_in_with")} />

            <form>
              <label className="form-label mb-3" htmlFor="email">
                Username <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                ref={this.usernameInput}
              />
              {this.validator.message(
                "username",
                this.state.username,
                "required",
                { className: "text-danger" }
              )}
              <label className="form-label mt-4 mb-3" htmlFor="password">
                {t("txt_password")} <span>*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                onKeyPress={this.onKeyPress}
              />
              {this.validator.message(
                "password",
                this.state.password,
                "required",
                { className: "text-danger" }
              )}
              <div className="mt-4 mb-3 d-flex justify-content-between">
                <Checkbox
                  name="remember"
                  text={t("txt_remember_me")}
                  checked={this.state.remember}
                  onCheckBoxChange={this.handleInputChange}
                />
                <a href="/forgot-password">{t("txt_forgot_password")}</a>
              </div>
              <ButtonNormal
                text={t("txt_sign_in")}
                onClick={this.handleSubmit}
                className="w-100 btn-success"
              />
              <a href="/signup" className="d-flex justify-content-center mt-4">
                {t("txt_do_not_have_an_account")}
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(LoginPage);
