import React from "react";
import "./index.scss";

class CanvaButton extends React.Component {
  field = null;
  canvaApi = null;
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      apiLoaded: false,
      exportUrl: "",
      designId: "",
    };

    this.field = this.props.field;
  }

  componentDidMount() {
    const _this = this;

    if (this.canvaApi === null) {
      console.log("[CanvaButton] Initialize canvaApi");

      (function (document, url) {
        var script = document.createElement("script");
        script.src = url;
        script.onload = function () {
          if (window.Canva && window.Canva.DesignButton) {
            window.Canva.DesignButton.initialize({
              apiKey: "GgtrPeZo0prog5FfpeZ_yjYS",
            }).then(function (api) {
              _this.canvaApi = api;
              _this.setState({ apiLoaded: true });
            });
          }
        };
        document.body.appendChild(script);
      })(document, "https://sdk.canva.com/designbutton/v2/api.js");
    }
  }

  handleClick = () => {
    const _this = this;

    this.canvaApi.createDesign({
      design: {
        type: "Poster",
      },
      onDesignPublish: function (options) {
        _this.field.changed(options);

        _this.setState({ exportUrl: options.exportUrl });
      },
    });
  };

  render() {
    console.log("[CanvaButton] render", this.field);
    console.log("[CanvaButton canvaApi] ", this.canvaApi);

    let { exportUrl, designId, apiLoaded } = this.state;

    return (
      apiLoaded && (
        <>
          <span
            className="canva-btn canva-btn-theme-default canva-btn-size-m"
            onClick={this.handleClick}
          >
            <span className="canva-btn-i"></span>
            Design on Canva
          </span>
          {exportUrl && (
            <div className={`d-flex justify-content-start border-top mt-4`}>
              <div key={designId} className="position-relative m-2">
                <img
                  className={`img-thumbnail rounded imgTab`}
                  src={exportUrl}
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
