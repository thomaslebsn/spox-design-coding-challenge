import React from "react";
import Dropzone from "react-dropzone";
import { withTranslation } from "react-i18next";
import ButtonNormal from "../../components/ButtomNormal";
import "./index.scss";

class CreateProject extends React.Component {
  constructor(props) {
    super(props);

    this.onDrop = (files) => {
      this.setState({ files });
    };
    this.state = {
      files: [],
    };
  }

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center ">
        <h3>Create a new project</h3>

        <form>
          <label className="form-label mb-3" htmlFor="name">
            Project name <span>*</span>
          </label>
          <input type="text" className="form-control mb-4" id="name" />

          <label className="form-label mb-3" htmlFor="startdate"></label>
          <input type="text" className="form-control mb-4" id="startdate" />

          <label className="form-label mb-3">
            Project logo <span>*</span>
          </label>
          <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png">
            {({ getRootProps, getInputProps }) => (
              <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>Drag and drop a file, or Choose file</p>
                </div>
              </section>
            )}
          </Dropzone>

          <label className="form-label mb-3" htmlFor="shortdesc">
            Short description about project <span>*</span>
          </label>
          <textarea className="form-control mb-4" id="shortdesc" />

          <ButtonNormal text="Texzt" />
        </form>
      </div>
    );
  }
}

export default withTranslation("common")(CreateProject);
