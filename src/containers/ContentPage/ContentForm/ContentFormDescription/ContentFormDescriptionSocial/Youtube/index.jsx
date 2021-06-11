import React, { Component, lazy } from 'react';
import { Form } from 'react-bootstrap';

const CanvaButton = lazy(() => import('../../../../../../components/CanvaButton'));
const DamButton = lazy(() => import('../../../../../../components/DamButton'));
const VideoButton = lazy(() => import('../../../../../../components/VideoButton'));

class YoutubeSocial extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;

    this.state = {
      getUrlVideo: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCanva = this.handleCanva.bind(this);
    this.handleDamAssets = this.handleDamAssets.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
  }

  handleChange(event) {
    this.field.dataContentDescriptionSocial.list_channels.social.youtube.description = event.target.value;
    this.props.changed(event.target.value);
  }

  handleCanva(exportUrl, designId) {
    this.field.dataContentDescriptionSocial.list_channels.social.youtube.assets.canvaAssets = {
      exportUrl: exportUrl,
      designId: designId,
    };
    this.props.changed(exportUrl, designId);
  }

  handleDamAssets(data) {
    this.field.dataContentDescriptionSocial.list_channels.social.youtube.assets.damAssets = data;
    this.props.changed(data);
  }

  handleVideo(event) {
    this.setState({
      getUrlVideo: event.target.files[0].name
    })

    this.field.dataContentDescriptionSocial.list_channels.social.youtube.assets.videoAssets.push(event.target.files[0].name);
    this.props.changed(event.target.files[0].name);
  }

  render() {
    console.log('[Social] render...');
    let { getUrlVideo } = this.state;

    return (
      <>
        <Form.Control
          as="textarea"
          defaultValue={this.field.dataContentDescriptionSocial.list_channels.social.youtube.description}
          // value={this.field.dataContentDescriptionSocial.social.instagram.data}
          required={this.field.required ?? false}
          id={this.field.key}
          onChange={this.handleChange}
          onBlur={this.field.blurred ?? undefined}
          rows="6"
          className="form-control rounded-0"
        />

        <div className="px-3 py-2 bg-blue-3 d-flex">
          <CanvaButton
            data={this.field.dataContentDescriptionSocial.list_channels.social.youtube.assets.canvaAssets}
            changed={this.handleCanva}
          />
          <DamButton 
            data={this.field.dataContentDescriptionSocial.list_channels.social.youtube.assets.damAssets}
            changed={this.handleDamAssets}
          />
        </div>
        <div className="mt-2">
          <VideoButton exportUrlVideo={getUrlVideo} handleVideo={this.handleVideo}/>
        </div>
      </>
    );
  }
}

export default YoutubeSocial;
