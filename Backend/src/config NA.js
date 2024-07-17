"use strict";

//NOT IN USE YET
import dotenv from "dotenv";
import assert from "assert"; //assert that all values are at least present in configuration

dotenv.config(); //read the .env file to load the environment

//The below code will just set "friendlier" names for the environment settings that MUST be uppercase in the .env
const {
  PORT,
  HOST,
  HOST_URL,
  COOKIE_ENCRYPT_PWD,
  SQL_SERVER,
  SQL_DATABASE,
  SQL_USER,
  SQL_PASSWORD,
  OKTA_ORG_URL,
  OKTA_CLIENT_ID,
  OKTA_CLIENT_SECRET,
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "false";

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(HOST, "HOST configuration is required.");
assert(HOST_URL, "HOST_URL configuration is required.");
assert(COOKIE_ENCRYPT_PWD, "COOKIE_ENCRYPT_PWD configuration is required.");
assert(SQL_SERVER, "SQL_SERVER configuration is required.");
assert(SQL_DATABASE, "SQL_DATABASE configuration is required.");
assert(SQL_USER, "SQL_USER configuration is required.");
assert(SQL_PASSWORD, "SQL_PASSWORD configuration is required.");
assert(OKTA_ORG_URL, "OKTA_ORG_URL configuration is required.");
assert(OKTA_CLIENT_ID, "OKTA_CLIENT_ID configuration is required.");
assert(OKTA_CLIENT_SECRET, "OKTA_CLIENT_SECRET configuration is required.");

// export the configuration information
module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  cookiePwd: COOKIE_ENCRYPT_PWD,
  sql: {
    server: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_USER,
    password: SQL_PASSWORD,
    domain: "corpnet.com",
    options: {
      encrypt: sqlEncrypt,
      enablearithabort: true,
    },
  },
  okta: {
    url: OKTA_ORG_URL,
    clientId: OKTA_CLIENT_ID,
    clientSecret: OKTA_CLIENT_SECRET,
  },
};
