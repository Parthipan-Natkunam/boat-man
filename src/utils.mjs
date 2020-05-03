export const dateTimeUtils = {
  getMonthName(date) {
    return new Date(date).toLocaleString("en-GB", {
      month: "long",
    });
  },

  getYear(date) {
    return new Date(date).toLocaleString("en-GB", { year: "numeric" });
  },
};

export const dataUtils = {
  createDataObject(columns) {
    const dataObject = {};
    dataObject["division"] = columns[0];
    dataObject["subDivision"] = columns[1];
    dataObject["subStation"] = columns[2];
    dataObject["fromDateTime"] = new Date(columns[3]);
    dataObject["toDateTime"] = new Date(columns[4]);
    dataObject["areas"] = columns[5];
    dataObject["month"] = dateTimeUtils.getMonthName(
      dataObject["fromDateTime"]
    );
    dataObject["year"] = dateTimeUtils.getYear(dataObject["fromDateTime"]);
    return dataObject;
  },
};
