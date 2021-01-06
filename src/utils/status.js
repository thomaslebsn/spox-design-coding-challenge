const STATUS = {
  POSTED: {
    id: 1,
    text: "Posted",
    className: "bg-status-1",
  },
  SCHEDULED: {
    id: 2,
    text: "Scheduled",
    className: "bg-status-2",
  },
  DRAFT: {
    id: 3,
    text: "Draft",
    className: "bg-status-3",
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
