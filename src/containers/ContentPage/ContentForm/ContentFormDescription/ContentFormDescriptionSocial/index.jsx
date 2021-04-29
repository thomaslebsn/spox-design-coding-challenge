import React, { Component, lazy } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Emoji, Picker } from 'emoji-mart';

import { OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';

const CanvaButton = lazy(() => import('../../../../../components/CanvaButton'));
const Dropzone = lazy(() => import('react-dropzone'));

class ContentFormDescriptionSocial extends Component {
  value = null;
  constructor(props) {
    super(props);

    this.value = this.props.value;
    this.field = this.props.field;

    this.editorRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePicker = this.handlePicker.bind(this);
    this.handleCanva = this.handleCanva.bind(this);
  }

  handleChange(event) {
    this.value.data = event.target.value;
    this.props.changed(this.value, 'social');
  }

  handleCanva(exportUrl, designId) {
    this.value.media = { exportUrl: exportUrl, designId: designId };
    this.props.changed(this.value, 'social');
  }

  handlePicker(emoji) {
    this.value.data = this.editorRef.current.value += emoji.native;
    this.props.changed(this.value, 'social');
  }

  render() {
    console.log('[Social] render...');

    return (
      <>
        <textarea
          className="form-control rounded-0 mb-2"
          rows="5"
          onChange={this.handleChange}
          onBlur={this.field.blurred}
          defaultValue={this.value.data}
          ref={this.editorRef}
        />

        <div className="d-flex justify-content-start border-top pt-2">
          {this.props.canva && (
            <div>
              <CanvaButton data={this.value.media} changed={this.handleCanva} />
            </div>
          )}
          {this.props.video && (
            <Dropzone onDrop={this.onDrop} accept="video/*">
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps({
                    className: 'cursor-pointer',
                  })}
                >
                  <input {...getInputProps()} />
                  <FontAwesomeIcon icon={faVideo} />
                </div>
              )}
            </Dropzone>
          )}
          <div className="ms-auto">
            <OverlayTrigger
              placement="top-start"
              trigger="click"
              overlay={<Picker set="apple" onSelect={(emoji) => this.handlePicker(emoji)} />}
            >
              <Emoji emoji="grinning" size={20} />
            </OverlayTrigger>
          </div>
        </div>
      </>
    );
  }
}

export default ContentFormDescriptionSocial;
