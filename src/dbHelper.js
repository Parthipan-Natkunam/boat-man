const MongoClient = require("mongodb").MongoClient;
const co = require("co");
const { dbConnectionString, dbCollection, dbName } = require("./config");

const client = new MongoClient(dbConnectionString, {
  useUnifiedTopology: true,
});

const writeToDB = co.wrap(function* (formattedData) {
  let mongoInstance;
  try {
    mongoInstance = yield client.connect();
    console.log("Connected to DB server Sucessfully...");
    const db = mongoInstance.db(dbName);
    const collection = db.collection(dbCollection);
    console.log("Building Unique Index...");
    yield collection.createIndex(
      { dv: 1, sdv: 1, sst: 1, fdt: 1, tdt: 1, ars: 1 },
      { unique: true, w: 1 }
    );
    console.log("Inserting data into Collection...");
    yield collection.insertMany(formattedData, { w: 1 });
  } catch (err) {
    console.error(err.message);
  } finally {
    mongoInstance.close();
    console.log("closed connection...");
  }
});

module.exports = {
  writeToDB,
};
