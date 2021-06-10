import React, { useState, lazy } from "react";
import { Form } from "react-bootstrap";
import DamButton from "../../../components/DamButton";
import Label from "../../../components/Form/Label";

import { FORM_FIELD_TYPE, FORMAT_DATE } from "../../../constants/FormFieldType";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons/faCloudUploadAlt";

const FormImage = lazy(() => import("../../../components/Form/FormImage"));

const ComponentFormFieldPersonaName = ({ validator, formPropsData }) => {
  const [getAvatar, setAvatar] = useState([]);

  let field = {
    label: "Persona Name",
    key: PERSONA_FIELD_KEY.NAME,
    type: FORM_FIELD_TYPE.INPUT,
    value: formPropsData[PERSONA_FIELD_KEY.NAME],
    required: true,
    validation: "required",
    changed: (event) => {
      formPropsData[PERSONA_FIELD_KEY.NAME] = event.target.value;
    },
  };

  // let fieldAvatar = {
  //   label: "Avatar",
  //   key: PERSONA_FIELD_KEY.AVATAR,
  //   type: FORM_FIELD_TYPE.IMAGE,
  //   value: formPropsData[PERSONA_FIELD_KEY.AVATAR],
  //   required: true,
  //   validation: "required",
  //   changed: (event) => {
  //     formPropsData[PERSONA_FIELD_KEY.AVATAR] = event.target.value;
  //   },
  // };

  const handleDamAssets = (data) => {
    formPropsData[PERSONA_FIELD_KEY.AVATAR] = data;
    setAvatar(data);
  }

  return (
    <>
      <Form.Group
        key={Math.random(40, 200)}
        className="mb-4 border-start-5 bg-white p-2 px-3 rounded-2"
      >
        <Label text={field.label} required={field.required ?? false} />
        <Form.Control
          as="input"
          defaultValue={field.value}
          required={field.required ?? false}
          id={field.key}
          onChange={field.changed ?? undefined}
          onBlur={field.blurred ?? undefined}
          className="border-0"
        />

        {field.validation &&
          validator.message(field.label, field.value, field.validation, {
            className: "text-danger",
          })}
      </Form.Group>
      <Form.Group
        key={Math.random(40, 200)}
        className={`mb-4 border-start-5 bg-white p-2 px-3 rounded-2`}
      >
        <Label text={"Avatar"} required={true} />

        {/* <FormImage key={Math.random(40, 200)} field={fieldAvatar} /> */}
        <div className={`position-relative cursor-pointer wr_upload_images ${getAvatar.length > 0 ? "active_img" : ""}`}>
          <div className="d-flex align-items-center p-3 wr_icon_upload">
            <i className="fs-1 text-blue-0 opacity-25">
              <FontAwesomeIcon icon={faCloudUploadAlt} />
            </i>
            <div className="text-center ms-1">
              <p className="mb-0">Drag and drop a file here </p>
              <p className="mb-0">
                or <strong>Choose file</strong>
              </p>
            </div>
          </div>
          {/* {"required" &&
            validator.message('Avatar', getAvatar.length > 0, 'required', {
              className: "text-danger",
            })} */}
          <div className="main_upload_images">
            <DamButton 
              data={formPropsData[PERSONA_FIELD_KEY.AVATAR]}
              changed={handleDamAssets}
            />
          </div>
        </div>
      </Form.Group>
    </>
  );
};

export default ComponentFormFieldPersonaName;
