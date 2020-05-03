import fs from "fs";
import { dataUtils } from "./utils.mjs";

const { createDataObject } = dataUtils;
const lineDelimitter = "--||**||--";
const delimitterLength = lineDelimitter.length;
const formattedData = [];

const transformRows = (rows) => {
  const columnDelimitter = " --|***|-- ";
  rows.forEach((row) => {
    const columns = row.split(columnDelimitter);
    const dataObject = createDataObject(columns);
    formattedData.push(dataObject);
  });
};

export const parseFile = (textFilePath) => {
  const rawDataArray = [];
  const fileStream = fs.createReadStream(textFilePath, "utf-8");

  let data = "";

  console.log("Initing File Read...");

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
      transformRows(rawDataArray);
      console.log("Transformation completed...");
      console.log(formattedData);
    }
  });
};
