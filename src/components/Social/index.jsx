import React from "react";
import { withTranslation } from "react-i18next";

import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons/faTwitterSquare";

import "./index.scss";
import Button from "../Button";

class Social extends React.Component {
  render() {
    return (
      <div className="row justify-content-around mb-3">
        <div className="col-md">
          <Button
            link="#"
            icon={faFacebookSquare}
            text="Facebook"
            className="w-100 btn-facebook mb-2"
          />
        </div>
        <div className="col-md">
          <Button
            link="#"
            icon={faTwitterSquare}
            text="Twitter"
            className="w-100 btn-twitter mb-2"
          />
        </div>
        <div className="col-md">
          <Button
            link="#"
            icon={faGoogle}
            text="Google"
            className="w-100 btn-google mb-2"
          />
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Social);
