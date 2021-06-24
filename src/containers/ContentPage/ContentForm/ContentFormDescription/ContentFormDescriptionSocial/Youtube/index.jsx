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
      getUrlVideo: this.field.dataContentDescriptionSocial.list_channels.social.youtube.assets.videoAssets,
      description: this.field.dataContentDescriptionSocial.list_channels.social.youtube.description,
      checkTypeVideo: false
    }

    this.handleChange = this.handleChange.bind(this);
    // this.handleCanva = this.handleCanva.bind(this);
    // this.handleDamAssets = this.handleDamAssets.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
  }

  handleChange(event) {
    this.setState({
      description: event.target.value
    })

    this.field.dataContentDescriptionSocial.list_channels.social.youtube.description = event.target.value;
    this.props.changed(event.target.value);
  }

  // handleCanva(exportUrl, designId) {
  //   this.field.dataContentDescriptionSocial.list_channels.social.youtube.assets.canvaAssets = {
  //     exportUrl: exportUrl,
  //     designId: designId,
  //   };
  //   this.props.changed(exportUrl, designId);
  // }

  // handleDamAssets(data, name) {
  //   if(name === "youtube") {
  //     if(data[0].extension != "mp4") {
  //       this.setState({
  //         getUrlImage: data
  //       })
  
  //       this.field.dataContentDescriptionSocial.list_channels.social.youtube.assets.damAssets = data;
  //       this.props.changed(data);
  //     }
  //   }
    
  // }

  handleVideo(data) {
    if(data[0].extension === "mp4") {
      this.setState({
        getUrlVideo: data,
        checkTypeVideo: false
      })

      this.field.dataContentDescriptionSocial.list_channels.social.youtube.assets.videoAssets = data;
      this.props.changed(data);
    } else {
      this.setState({
        checkTypeVideo: true
      })
    }
  }


  render() {
    console.log('[Social] render...');
    let { getUrlVideo, checkTypeVideo, description } = this.state;

    return (
      <>
        <Form.Control
          as="textarea"
          //defaultValue={this.field.dataContentDescriptionSocial.list_channels.social.youtube.description}
          value={description}
          required={this.field.required ?? false}
          id={this.field.key}
          onChange={this.handleChange}
          onBlur={this.field.blurred ?? undefined}
          rows="6"
          className="form-control rounded-0"
        />

        {/* <div className="px-3 py-2 bg-blue-3 d-flex">
          <CanvaButton
            data={this.field.dataContentDescriptionSocial.list_channels.social.youtube.assets.canvaAssets}
            changed={this.handleCanva}
          />
          <DamButton 
            data={getUrlImage}
            changed={(data, name) => this.handleDamAssets(data, name)}
            name="youtube"
            dataYoutube={getUrlImage}
          />
        </div> */}
        <div className="wr_dam_full_width px-3 py-2 bg-blue-3 d-flex">
          <VideoButton 
            dataVideo={getUrlVideo}
            changed={(data) => this.handleVideo(data)}
            checkTypeVideo={checkTypeVideo}
          />
        </div>
      </>
    );
  }
}

export default YoutubeSocial;
