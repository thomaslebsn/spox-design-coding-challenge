import React, { Component, lazy } from 'react';
import { Form } from 'react-bootstrap';
import DamButton from '../../../../../components/DamButton';
import VideoButton from '../../../../../components/VideoButton';

const CanvaButton = lazy(() => import('../../../../../components/CanvaButton'));

class ContentFormDescriptionSingle extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;

    this.state = {
      getUrlVideo: this.field.dataContentDescriptionSingle.list_channels.youtube.assets.videoAssets,
      getUrlImage: Object.values(this.field.dataContentDescriptionSingle.list_channels)[0].assets.damAssets,
      checkTypeVideo: false,
      checkTypeImage: false,
      description: Object.values(this.field.dataContentDescriptionSingle.list_channels)[0].description
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCanva = this.handleCanva.bind(this);
    this.handleDamAssets = this.handleDamAssets.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
  }

  handleChange(event) {
    this.setState({
      description: event.target.value
    })

    let dataContentDescriptionSingleArray = Object.values(this.field.dataContentDescriptionSingle.list_channels);

    dataContentDescriptionSingleArray.map((value) => value.description = event.target.value)
    this.props.changed(event.target.value);
  }

  handleCanva(exportUrl, designId) {
    // this.field.dataContentDescriptionSingle.media = { exportUrl: exportUrl, designId: designId };
    let dataContentDescriptionSingleArray = Object.values(this.field.dataContentDescriptionSingle.list_channels);

    dataContentDescriptionSingleArray.map((value) => value.assets.canvaAssets = { exportUrl: exportUrl, designId: designId })
    this.props.changed(exportUrl, designId);
  }

  handleDamAssets(data) {
    if(data[0].extension != "mp4") {
      this.setState({
        getUrlImage: data,
        checkTypeImage: false
      })

      let dataContentDescriptionSingleArray = Object.values(this.field.dataContentDescriptionSingle.list_channels);

      dataContentDescriptionSingleArray.map((value) => value.assets.damAssets = data)
      this.props.changed(data);
    } else {
      this.setState({
        checkTypeImage: true
      })
    }
  }

  handleVideo(data) {
    if(data[0].extension === "mp4") {
      this.setState({
        getUrlVideo: data,
        checkTypeVideo: false
      })

      this.field.dataContentDescriptionSingle.list_channels.youtube.assets.videoAssets = data;
      this.props.changed(data);
    } else {
      this.setState({
        checkTypeVideo: true
      })
    }
  }

  render() {
    let { getUrlVideo, getUrlImage, checkTypeVideo, checkTypeImage, description } = this.state;
    let { checkConnectYoutube } = this.props;
    let { dataContentDescriptionSingle } = this.field;
    
    return (
      <>
        <Form.Control
          as="textarea"
          defaultValue={description}
          //value={description}
          required={this.field.required ?? false}
          id={this.field.key}
          onChange={this.handleChange}
          onBlur={this.field.blurred ?? undefined}
          rows="6"
          className="form-control rounded-0"
        />
        <div className="px-3 py-2 bg-blue-3 wr_description_image_asset">
          <div className="d-flex">
            <CanvaButton
              data={Object.values(dataContentDescriptionSingle.list_channels)[0].assets.canvaAssets}
              changed={this.handleCanva}
            />
            <DamButton 
              data={getUrlImage}
              changed={(data) => this.handleDamAssets(data)}
              checkTypeImage={checkTypeImage}
            />
          </div>
          {
            checkConnectYoutube && (
              <div className="mt-2 wr_video_assets wr_dam_full_width">
                <VideoButton 
                  dataVideo={getUrlVideo}
                  changed={(data) => this.handleVideo(data)}
                  checkTypeVideo={checkTypeVideo}
                />
              </div>
            )
          }
        </div>
      </>
    );
  }
}

export default ContentFormDescriptionSingle;
