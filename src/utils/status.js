const STATUS = {
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

const getStatus = (status) => {
  return Object.keys(STATUS)
    .filter((index) => STATUS[index].id === status)
    .reduce((obj, key) => {
      obj = STATUS[key];
      return obj;
    }, {});
};

export default getStatus;
