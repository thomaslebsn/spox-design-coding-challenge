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
    this._isMounted = true;

    if (this.canvaApi === null) {
      console.log("[CanvaButton] Initialize canvaApi");

      const script = document.createElement("script");
      script.src = "https://sdk.canva.com/designbutton/v2/api.js";
      script.onload = function () {
        if (window.Canva && window.Canva.DesignButton) {
          window.Canva.DesignButton.initialize({
            apiKey: "GgtrPeZo0prog5FfpeZ_yjYS",
          }).then(function (api) {
            _this.canvaApi = api;
            if (_this._isMounted) {
              _this.setState({ apiLoaded: true });
            }
          });
        }
      };

      document.body.appendChild(script);
    }
    const canvaData = this.field.value;
    if (canvaData.exportedUrl && canvaData.designId) {
      this.setState({
        exportUrl: canvaData.exportedUrl,
        designId: canvaData.designId,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClick = () => {
    const _this = this;
    document.body.classList.remove("wr_export_url_canva");

    this.canvaApi.createDesign({
      design: {
        type: "Poster",
      },
      onDesignPublish: function ({ exportUrl, designId }) {
        _this.field.changed({ exportUrl, designId });
        _this.setState({ exportUrl: exportUrl, designId: designId });
      },
    });
  };

  render() {
    console.log("[CanvaButton] render", this.field);
    console.log("[CanvaButton canvaApi] ", this.canvaApi);

    let { exportUrl, designId, apiLoaded } = this.state;

    if (exportUrl) {
      document.body.classList.add("wr_export_url_canva");
    }

    return (
      apiLoaded && (
        <>
          <button
            className="canva-btn canva-btn-theme-default canva-btn-size-m"
            onClick={this.handleClick}
            type="button"
          >
            <span className="canva-btn-i"></span>
            Design on Canva
          </button>
          {exportUrl && (
            <div className={`d-flex justify-content-start border-top mt-4`}>
              <div key={designId} className="position-relative w-25 m-2">
                <img
                  className={`img-thumbnail rounded imgTab`}
                  alt={exportUrl}
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
