const fs = require("fs");

const textFilePath = "../power_data.txt"; //TODO: remove relative path in final version, as this file will always be in PWD
const fileStream = fs.createReadStream(textFilePath, "utf-8");
const lineDelimitter = "--||**||--";
const delimitterLength = lineDelimitter.length;
const rawDataArray = [];
const formattedData = [];

const getMonthName = (date) => {
  return new Date(date).toLocaleString("en-GB", {
    month: "long",
  });
};

const getYear = (date) => {
  return new Date(date).toLocaleString("en-GB", { year: "numeric" });
};

const createDataObject = (columns) => {
  const dataObject = {};
  dataObject["division"] = columns[0];
  dataObject["subDivision"] = columns[1];
  dataObject["subStation"] = columns[2];
  dataObject["fromDateTime"] = new Date(columns[3]);
  dataObject["toDateTime"] = new Date(columns[4]);
  dataObject["areas"] = columns[5];
  dataObject["month"] = getMonthName(dataObject["fromDateTime"]);
  dataObject["year"] = getYear(dataObject["fromDateTime"]);
  return dataObject;
};

const transformRows = (rows) => {
  const columnDelimitter = " --|***|-- ";
  rows.forEach((row) => {
    const columns = row.split(columnDelimitter);
    const dataObject = createDataObject(columns);
    formattedData.push(dataObject);
  });
};

let data = "";

console.log("Initing File Read...");

fileStream.on("readable", () => {
  data += fileStream.read();
  while (data.indexOf(lineDelimitter) > -1) {
    fileStream.emit("newRow", data.substring(0, data.indexOf(lineDelimitter)));
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
