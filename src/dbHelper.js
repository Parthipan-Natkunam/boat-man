const MongoClient = require("mongodb").MongoClient;
const { dbConnectionString, dbCollection, dbName } = require("./config");

const client = new MongoClient(dbConnectionString, {
  useUnifiedTopology: true,
});

const writeToDB = (formattedData) => {
  client.connect(function (err, cursorInstance) {
    if (err) {
      throw new Error(err);
    }
    console.log("Connected to DB server Sucessfully...");
    const db = cursorInstance.db(dbName);
    const collection = db.collection(dbCollection);
    console.log("Writing to DB ...");
    collection.insertMany(formattedData, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      client.close();
      console.log("closing connection...");
    });
  });
};

module.exports = {
  writeToDB,
};
