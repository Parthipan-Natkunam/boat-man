const { parseFile } = require("./fileParser");
const { writeToDB } = require("./dbHelper");

const textFilePath = "../power_data.txt"; //TODO: remove relative path in final version, as this file will always be in PWD

parseFile(textFilePath)
  .then((formatedDataArray) => {
    writeToDB(formatedDataArray);
  })
  .catch((err) => {
    if (err && err.message) {
      console.error(err.message);
      return;
    }
    throw new Error("parseFile Promise Rejected!");
  });
