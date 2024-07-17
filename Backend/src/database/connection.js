"use strict";

import sql from "mssql";
import dotenv from "dotenv";

dotenv.config(); //read the .env file to load the environment

const dbSettings = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  domain: "corpnet.com",
  options: {
    encrypt: false, // true for Azure
    trustServerCertificate: true, // change to false for production
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.log(error);
  }
};
export default getConnection;
