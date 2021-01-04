const CONTENT_FIELD_KEY = {
  ID: "content-id",
  NAME: "content-name",
  DESCRIPTION: "content-description",
  THEME: "content-theme",
  CUSTOMIZE_SCHEDULE_FOR_EACH_CHANNEL:
    "content-customize-schedule-for-each-channel",
  PUBLISH_DATE: "content-publish-date",
  PUBLISH_REGULARLY: "content-publish-regularly",
  SCHEDULE_CHANNEL: "content-schedule-channel",
  DATE_FROM: "content-date-from",
  DATE_UNTIL: "content-date-until",
  TIME: "content-time",
  PERSONA: "content-persona",
  CAMPAIGN: "content-campaign",
  CHANNELS: "content-channels",
  STATUS: "content-status",
};

const CONTENT_STATUS = {
  POSTED: {
    id: 1,
    text: "Posted",
    className: "bg-success",
  },
  SCHEDULED: {
    id: 2,
    text: "Scheduled",
    className: "bg-secondary",
  },
  DRAFT: {
    id: 3,
    text: "Draft",
    className: "bg-warning",
  },
};

export { CONTENT_FIELD_KEY, CONTENT_STATUS };
