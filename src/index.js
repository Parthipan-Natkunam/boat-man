import { parseFile } from "./fileParser.mjs";

const textFilePath = "../power_data.txt"; //TODO: remove relative path in final version, as this file will always be in PWD

parseFile(textFilePath)
  .then((formatedDataArray) => {
    console.log(formatedDataArray[formatedDataArray.length - 1]);
  })
  .catch((err) => {
    if (err && err.message) {
      console.error(err.message);
      return;
    }
    throw new Error("parseFile Promise Rejected!");
  });
