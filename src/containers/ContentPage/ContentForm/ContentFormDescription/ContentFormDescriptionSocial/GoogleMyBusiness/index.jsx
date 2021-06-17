import React, { Component, lazy } from 'react';
import { Form } from 'react-bootstrap';

const CanvaButton = lazy(() => import('../../../../../../components/CanvaButton'));
const DamButton = lazy(() => import('../../../../../../components/DamButton'));

class GoogleMyBusinessSocial extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;

    this.state = {
      getUrlImage: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCanva = this.handleCanva.bind(this);
    this.handleDamAssets = this.handleDamAssets.bind(this);
  }

  handleChange(event) {
    this.field.dataContentDescriptionSocial.list_channels.social.google_my_business.description = event.target.value;
    this.props.changed(event.target.value);
  }

  handleCanva(exportUrl, designId) {
    this.field.dataContentDescriptionSocial.list_channels.social.google_my_business.assets.canvaAssets = {
      exportUrl: exportUrl,
      designId: designId,
    };
    this.props.changed(exportUrl, designId);
  }

  handleDamAssets(data) {
    if(data[0].extension != "mp4") {
      this.setState({
        getUrlImage: data
      })

      this.field.dataContentDescriptionSocial.list_channels.social.google_my_business.assets.damAssets = data;
      this.props.changed(data);
    }
  }

  render() {
    console.log('[Social] render...');
    let { getUrlImage } = this.state;

    return (
      <>
        <Form.Control
          as="textarea"
          defaultValue={this.field.dataContentDescriptionSocial.list_channels.social.google_my_business.description}
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
            data={this.field.dataContentDescriptionSocial.list_channels.social.google_my_business.assets.canvaAssets}
            changed={this.handleCanva}
          />
          <DamButton 
            data={getUrlImage}
            changed={(data) => this.handleDamAssets(data)}
          />
        </div>
      </>
    );
  }
}

export default GoogleMyBusinessSocial;
