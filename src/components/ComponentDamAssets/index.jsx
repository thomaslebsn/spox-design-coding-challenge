import React, { useState, lazy } from "react";
import { Form } from "react-bootstrap";
import DamButton from "../DamButton";
import Label from "../Form/Label";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons/faCloudUploadAlt";
import { PROJECT_COLUMN_INDICATOR } from "../../constants/ProjectModule";

const ComponentDamAssets = ({ validator, formPropsData }) => {
  const [getAvatar, setAvatar] = useState([]);
  const [checkTypeImage, setCheckTypeImage] = useState(false)

  const handleDamAssets = (data) => {
    console.log('data data data logo project');
    console.log(data[0].url);
    
    if(data[0].extension != "mp4") {
      setCheckTypeImage(false);
      formPropsData[PROJECT_COLUMN_INDICATOR.LOGO] = data[0].url;
      setAvatar(data);
    } else {
      setCheckTypeImage(true)
    }
  }

  return (
    <>
      <Form.Group
        key={Math.random(40, 200)}
        className={`mb-4`}
      >
        <div className={`position-relative cursor-pointer wr_upload_images ${getAvatar.length > 0 ? "active_img" : ""}`}>
          <div className="d-flex align-items-center p-3 wr_icon_upload w-100 justify-content-center">
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
              data={getAvatar}
              changed={(data) => handleDamAssets(data)}
              checkTypeImage={checkTypeImage}
            />
          </div>
        </div>
      </Form.Group>
    </>
  );
};

export default ComponentDamAssets;
