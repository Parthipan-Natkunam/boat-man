const dateTimeUtils = {
  getMonthName(date) {
    return new Date(date).toLocaleString("en-GB", {
      month: "long",
    });
  },

  getYear(date) {
    return new Date(date).toLocaleString("en-GB", { year: "numeric" });
  },
};

const dataUtils = {
  createDataObject(columns) {
    const dataObject = {};
    dataObject["dv"] = columns[0] || "N/A";
    dataObject["sdv"] = columns[1] || "N/A";
    dataObject["sst"] = columns[2] || "N/A";
    dataObject["fdt"] = new Date(columns[3]);
    dataObject["tdt"] = new Date(columns[4]);
    dataObject["ars"] = columns[5] || "N/A";
    dataObject["mon"] = dateTimeUtils.getMonthName(dataObject["fdt"]);
    dataObject["yr"] = dateTimeUtils.getYear(dataObject["fdt"]);
    return dataObject;
  },
};

module.exports = {
  dateTimeUtils,
  dataUtils,
};
