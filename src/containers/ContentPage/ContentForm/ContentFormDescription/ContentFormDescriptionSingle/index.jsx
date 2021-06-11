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
      getUrlVideo: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCanva = this.handleCanva.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.handleDamAssets = this.handleDamAssets.bind(this);
  }

  handleChange(event) {
    //this.field.dataContentDescriptionSingle.data = event.target.value;
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
    let dataContentDescriptionSingleArray = Object.values(this.field.dataContentDescriptionSingle.list_channels);

    dataContentDescriptionSingleArray.map((value) => value.assets.damAssets = data)
    this.props.changed(data);
  }

  handleVideo(event) {
    this.setState({
      getUrlVideo: event.target.files[0].name
    })

    this.field.dataContentDescriptionSingle.list_channels.youtube.assets.videoAssets.push(event.target.files[0].name);
    this.props.changed(event.target.files[0].name);
  }

  render() {
    let { getUrlVideo } = this.state;
    let { checkConnectYoutube } = this.props;
    let { dataContentDescriptionSingle } = this.field;

    console.log('this.field.dataContentDescriptionSingle.list_channels.youtube.assets.videoAssets');
    console.log(this.field.dataContentDescriptionSingle.list_channels.youtube.assets.videoAssets);
    console.log(this.field.dataContentDescriptionSingle.list_channels.youtube.assets.videoAssets.length);
    
    return (
      <>
        <Form.Control
          as="textarea"
          defaultValue={Object.values(dataContentDescriptionSingle.list_channels)[0].description}
          // value={this.field.dataContentDescriptionSingle.data}
          required={this.field.required ?? false}
          id={this.field.key}
          onChange={this.handleChange}
          onBlur={this.field.blurred ?? undefined}
          rows="6"
          className="form-control rounded-0"
        />
        <div className="px-3 py-2 bg-blue-3">
          <div className="d-flex">
            <CanvaButton
              data={Object.values(dataContentDescriptionSingle.list_channels)[0].assets.canvaAssets}
              changed={this.handleCanva}
            />
            <DamButton 
              data={Object.values(dataContentDescriptionSingle.list_channels)[0].assets.damAssets}
              changed={this.handleDamAssets}
            />
          </div>
          {
            checkConnectYoutube && (
              <div className="mt-2">
                <VideoButton exportUrlVideo={getUrlVideo} handleVideo={this.handleVideo}/>
              </div>
            )
          }
        </div>
      </>
    );
  }
}

export default ContentFormDescriptionSingle;
