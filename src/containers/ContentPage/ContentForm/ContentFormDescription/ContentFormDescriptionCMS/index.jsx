import React, { Component, lazy } from 'react';

const ComponentEditor = lazy(() => import('../../../../../components/ComponentEditor'));

const CanvaButton = lazy(() => import('../../../../../components/CanvaButton'));

class ContentFormDescriptionCMS extends Component {
  value = null;

  constructor(props) {
    super(props);

    this.value = this.props.value;
    this.field = this.props.field;

    this.handleChange = this.handleChange.bind(this);
    this.handleCanva = this.handleCanva.bind(this);
  }

  handleChange(event, editor) {
    this.value.data = editor.getData();
    this.props.changed(this.value, 'cms');
  }

  handleCanva(exportUrl, designId) {
    this.value.media = { exportUrl: exportUrl, designId: designId };
    this.props.changed(this.value, 'cms');
  }

  render() {
    return (
      <>
        <ComponentEditor
          data={this.value.data}
          onChange={(event, editor) => this.handleChange(event, editor)}
          onBlur={this.field.blurred}
        />
        <div className="mt-2">
          <CanvaButton data={this.value.media} changed={this.handleCanva} />
        </div>
      </>
    );
  }
}

export default ContentFormDescriptionCMS;
