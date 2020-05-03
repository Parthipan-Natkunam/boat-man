import dotenv from "dotenv";

dotenv.config();

export default {
  dbURL: process.env.DB_URL,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbCollection: process.env.DB_COLLECTION,
};
