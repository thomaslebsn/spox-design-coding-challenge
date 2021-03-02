import React from "react";
import "./index.scss";

(function (document, url) {
  var script = document.createElement("script");
  script.src = url;

  document.body.appendChild(script);
})(document, "https://sdk.canva.com/designbutton/v2/api.js");

class CanvaButton extends React.Component {
  api = null;
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    if (this.api != null) {
      return;
    }

    console.log("initializeAPI");
    if (window.Canva && window.Canva.DesignButton) {
      this.api = await window.Canva.DesignButton.initialize({
        apiKey: "GgtrPeZo0prog5FfpeZ_yjYS",
      });
    }
  }

  handleClick = () => {
    this.api.createDesign({
      design: {
        type: "Poster",
      },

      onDesignPublish: function (options) {
        // Triggered when design is published to an image.
        var exportUrl = options.exportUrl;
        var designId = options.designId;
        // Save the image to your server as the exportUrl will expire shortly.

        console.log("onDesignPublish", options);
      },
      onDesignClose: function () {
        // Triggered when editor is closed.

        console.log("onDesignClose");
      },
    });
  };

  render() {
    return (
      <span
        className="canva-btn canva-btn-theme-default canva-btn-size-m"
        onClick={this.handleClick}
      >
        <span className="canva-btn-i"></span>
        Design on Canva
      </span>
    );
  }
}

export { CanvaButton };
