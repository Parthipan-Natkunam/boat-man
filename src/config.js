const dotenv = require("dotenv");

dotenv.config();

const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_COLLECTION,
  DB_PROTOCOL,
} = process.env;

const dbConnectionString = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const dbName = DB_NAME;
const dbCollection = DB_COLLECTION;

module.exports = {
  dbConnectionString,
  dbName,
  dbCollection,
};
