import React, { Component, lazy } from 'react';
import { Form } from 'react-bootstrap';

const CanvaButton = lazy(() => import('../../../../../../components/CanvaButton'));
const DamButton = lazy(() => import('../../../../../../components/DamButton'));

class WordpressSocial extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;

    this.handleChange = this.handleChange.bind(this);
    this.handleCanva = this.handleCanva.bind(this);
  }

  handleChange(event) {
    this.field.dataContentDescriptionSocial.list_channels.cms.wordpress.data = event.target.value;
    this.props.changed(event.target.value);
  }

  handleCanva(exportUrl, designId) {
    this.field.dataContentDescriptionSocial.list_channels.cms.wordpress.media = {
      exportUrl: exportUrl,
      designId: designId,
    };
    this.props.changed(exportUrl, designId);
  }

  render() {
    console.log('[Social] render...');

    return (
      <>
        <Form.Control
          as="textarea"
          defaultValue={this.field.dataContentDescriptionSocial.list_channels.cms.wordpress.data}
          // value={this.field.dataContentDescriptionSocial.cms.wordpress.data}
          required={this.field.required ?? false}
          id={this.field.key}
          onChange={this.handleChange}
          onBlur={this.field.blurred ?? undefined}
          rows="6"
          className="form-control rounded-0"
        />

        <div className="px-3 py-2 bg-blue-3 d-flex">
          <CanvaButton
            data={this.field.dataContentDescriptionSocial.list_channels.cms.wordpress.media}
            changed={this.handleCanva}
          />
          <DamButton />
        </div>
      </>
    );
  }
}

export default WordpressSocial;
