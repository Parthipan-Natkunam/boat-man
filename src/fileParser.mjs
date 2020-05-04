import fs from "fs";
import { dataUtils } from "./utils.mjs";
import { resolve } from "dns";

const { createDataObject } = dataUtils;
const lineDelimitter = "--||**||--";
const delimitterLength = lineDelimitter.length;
const formattedData = [];

const transformRows = (rows) => {
  const columnDelimitter = " --|***|-- ";
  rows.forEach((row, index) => {
    const columns = row.split(columnDelimitter);
    if (columns instanceof Array && columns.length && columns[0] !== "null") {
      const dataObject = createDataObject(columns);
      formattedData.push(dataObject);
    }
  });
};

export const parseFile = (textFilePath) => {
  const rawDataArray = [];
  const fileStream = fs.createReadStream(textFilePath, "utf-8");

  let data = "";

  console.log("Initing File Read...");

  return new Promise((resolve, reject) => {
    fileStream.on("readable", () => {
      data += fileStream.read();
      while (data.indexOf(lineDelimitter) > -1) {
        fileStream.emit(
          "newRow",
          data.substring(0, data.indexOf(lineDelimitter))
        );
        data = data.substring(data.indexOf(lineDelimitter) + delimitterLength);
      }
    });

    fileStream.on("end", () => {
      fileStream.emit("newRow", data, true);
    });

    fileStream.on("newRow", (dataRow, endOfFile) => {
      rawDataArray.push(dataRow);
      if (endOfFile) {
        console.log("File Read Successful");
        console.log("Transforming Data...This may take a while...");
        try {
          transformRows(rawDataArray);
          console.log("Transformation completed...");
          resolve(formattedData);
        } catch (err) {
          console.error("Transformation Failed...");
          reject(err);
        }
      }
    });
  });
};
