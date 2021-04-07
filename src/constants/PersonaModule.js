const PERSONA_FIELD_KEY = {
  ID: "personal-id",
  NAME: "personal-name",
  DG_NAME: "personal-dg-name",
  CHANNELS: "personal-channel",
  AGE: "personal-age",
  GENDER: "personal-gender",
  LOCATION: "personal-location",
  TOOLS: "personal-tools",
  JOB_TITLE: "personal-job-title",
  WEBSITE: "personal-job-website",
  SECTOR: "personal-job-sector",
  VENDOR_RESEARCH: "personal-vendor-research",
  INTEREST: "personal-interest",
  GOALS: "personal-goals",
  MARITAL_STATUS: "personal-marital-status",
  CHALLENGES: "personal-challenges",
  PAINT_POINT: "personal-paint-point",
  AVATAR: "personal-avatar",
  BIO: "personal-bio",
  CREATED_DATE: "created-date",
  UPDATED_DATE: "updated-date",
  IMAGE: "personal-image",
};

const ESI_PERSONA_FIELD_KEY = {
  ID: "id",
  NAME: "title",
  DG_NAME: "name",
  CHANNEL: "channels",
  AGE: "age",
  GENDER: "gender",
  LOCATION: "location",
  TOOLS: "tools",
  JOB_TITLE: "job_title",
  WEBSITE: "website",
  SECTOR: "sector",
  VENDOR_RESEARCH: "vendor_research",
  INTEREST: "interests",
  GOALS: "goals",
  MARITAL_STATUS: "marital_status",
  CHALLENGES: "challenges",
  PAINT_POINT: "paint_point",
  AVATAR: "avatar",
  BIO: "bio",
  CREATED_DATE: "created_date",
  MODIFIED_DATE: "modified_date",
};

// Todo: get from API
const GENDER = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

// Todo: get from API
const MARITAL_STATUS = [
  { value: "maritalStatus", label: "Marital Status" },
  { value: "maritalStatus2", label: "Marital Status2" },
];

const PERSONA_COLUMN_INDICATOR = {
  ID: "id",
  NAME: "name",
};

const PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR = {
  ID: "id",
  NAME: "name",
  LABEL: "label",
  VALUE: "value",
};

export {
  PERSONA_FIELD_KEY,
  ESI_PERSONA_FIELD_KEY,
  GENDER,
  MARITAL_STATUS,
  PERSONA_COLUMN_INDICATOR,
  PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR,
};
