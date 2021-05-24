import React from 'react';
import { canvaApi } from '../../utils/canva';
import './index.scss';

class CanvaButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exportUrl: this.props.data.exportUrl,
      designId: this.props.data.designId,
    };
  }

  handleClick = () => {
    const _this = this;
    document.body.classList.remove('wr_export_url_canva');

    canvaApi.createDesign({
      design: {
        type: 'Poster',
      },
      onDesignPublish: function ({ exportUrl, designId }) {
        _this.setState(
          { exportUrl: exportUrl, designId: designId },
          _this.props.changed(exportUrl, designId)
        );
      },
    });
  };

  render() {
    console.log('[CanvaButton] render');
    console.log('[CanvaButton canvaApi] ', canvaApi);

    let { exportUrl, designId } = this.state;

    if (exportUrl) {
      document.body.classList.add('wr_export_url_canva');
    }

    return (
      <div className={`${exportUrl ? 'w-50' : ''}`}>
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
            <div key={designId} className="position-relative w-50 m-2">
              <img className={`img-thumbnail rounded imgTab`} alt={exportUrl} src={exportUrl} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CanvaButton;
