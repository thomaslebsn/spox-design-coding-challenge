import React, { Component, lazy } from 'react';
import { Form } from 'react-bootstrap';
import DamButton from '../../../../../components/DamButton';

const CanvaButton = lazy(() => import('../../../../../components/CanvaButton'));

class ContentFormDescriptionSingle extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;

    this.handleChange = this.handleChange.bind(this);
    this.handleCanva = this.handleCanva.bind(this);
  }

  handleChange(event) {
    this.field.dataContentDescriptionSingle.data = event.target.value;
    this.props.changed(event.target.value);
  }

  handleCanva(exportUrl, designId) {
    this.field.dataContentDescriptionSingle.media = { exportUrl: exportUrl, designId: designId };
    this.props.changed(exportUrl, designId);
  }

  render() {
    return (
      <>
        <Form.Control
          as="textarea"
          defaultValue={this.field.dataContentDescriptionSingle.data}
          // value={this.field.dataContentDescriptionSingle.data}
          required={this.field.required ?? false}
          id={this.field.key}
          onChange={this.handleChange}
          onBlur={this.field.blurred ?? undefined}
          rows="6"
          className="form-control rounded-0"
        />
        <div className="px-3 py-2 bg-blue-3 d-flex">
          <CanvaButton
            data={this.field.dataContentDescriptionSingle.media}
            changed={this.handleCanva}
          />
          <DamButton />
        </div>
      </>
    );
  }
}

export default ContentFormDescriptionSingle;
