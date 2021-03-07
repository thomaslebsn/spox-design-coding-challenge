import React from "react";
import "./index.scss";

import { ESI_CONTENT_THEME_FIELD_KEY } from "../../constants/ContentThemeModule";

let canvaApi = null;

class CanvaButton extends React.Component {
  field = null;
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      apiLoaded: false,
      exportUrl: "",
      designId: "",
    };

    this.field = this.props.field;

    const _this = this;
    _this._isMounted = true;

    if (canvaApi === null) {
      console.log("[CanvaButton] Initialize canvaApi");

      (function (document, url) {
        var script = document.createElement("script");
        script.src = url;
        script.onload = function () {
          if (window.Canva && window.Canva.DesignButton) {
            window.Canva.DesignButton.initialize({
              apiKey: "GgtrPeZo0prog5FfpeZ_yjYS",
            }).then(function (api) {
              canvaApi = api;

              _this.setState({ apiLoaded: true });
            });
          }
        };
        document.body.appendChild(script);
      })(document, "https://sdk.canva.com/designbutton/v2/api.js");
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  handleClick = () => {
    const _this = this;

    canvaApi.createDesign({
      design: {
        type: "Poster",
      },
      onDesignOpen: ({ designId }) => {
        // field.clicked();
      },
      onDesignPublish: function (options) {
        _this.field.changed(options);
        _this.forceUpdate();
      },

      onDesignClose: function () {
        console.log("[CanvaButton onDesignClose]");
      },
    });
  };

  close = () => {
    console.log("[CanvaButton close]");
    this.setState({ exportUrl: "test" });
  };

  render() {
    console.log("[CanvaButton] render", this.field);

    let { exportUrl, designId, apiLoaded } = this.state;

    console.log("[CanvaButton field] ", this.field);

    return (
      canvaApi && (
        <>
          <button
            className="canva-btn canva-btn-theme-default canva-btn-size-m"
            onClick={this.handleClick}
          >
            <span className="canva-btn-i"></span>
            Design on Canva
          </button>
          {exportUrl && (
            <div className={`d-flex justify-content-start border-top mt-4`}>
              <div key={designId} className="position-relative m-2">
                <img
                  className={`img-thumbnail rounded imgTab`}
                  src={URL.createObjectURL(value[exportUrl])}
                />
              </div>
            </div>
          )}
        </>
      )
    );
  }
}

export default CanvaButton;
