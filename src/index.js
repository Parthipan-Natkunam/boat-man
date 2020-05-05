const co = require("co");
const _ = require("lodash");
const { parseFile } = require("./fileParser");
const { writeToDB } = require("./dbHelper");

const textFilePath = "../power_data.txt"; //TODO: remove relative path in final version, as this file will always be in PWD

co(function* () {
  try {
    const formattedData = yield parseFile(textFilePath);
    console.log("total data count: ", formattedData.length);
    console.log("removing duplicate entries...");
    const uniqueData = _.uniqBy(formattedData, function (data) {
      return data.dv + data.sdv + data.ars + data.sst + data.fdt + data.tdt;
    });
    console.log("Duplicates removed....");
    console.log("Unique data count: ", uniqueData.length);
    yield writeToDB(uniqueData);
  } catch (err) {
    console.error(err.message);
  }
});
