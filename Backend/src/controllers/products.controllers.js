"use strict";

import { getConnection } from "../database/connection.js"; // Assuming getConnection is correctly exported from your connection.js file
import fs from "fs-extra";
import path from "path";
import sql from "mssql";
import { fileURLToPath } from "url";

// Obtain the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(path.dirname(__filename))); // Move up two directory levels to Backend\database

// Function to read SQL files from Backend\database
const readSQLFile = (filePath) => {
  return fs.readFileSync(path.resolve(__dirname, filePath), {
    encoding: "utf-8",
  });
};

export const getMember = async (req, res, next) => {
  const sqlQuery = readSQLFile("database/select_web_proc_GetMembers.sql");

  try {
    const result = await req.pool
      .request()
      .input("id", sql.Char(10), req.params.id)
      .query(sqlQuery);

    if (result.recordset.length > 0) {
      req.member = result.recordset; // Store result in req
      next(); // Proceed to the next middleware
    } else {
      return res
        .status(404)
        .json({ message: `Membership with ID '${req.params.id}' not found` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//getting Usage on a SINGLE membership, id = /memberships/id
// src/controllers/products.controllers.js
export const getUsage = async (req, res, next) => {
  const sqlQuery = readSQLFile("database/select_web_proc_GetUsage.sql");

  try {
    const result = await req.pool
      .request()
      .input("id", sql.Char(10), req.params.id)
      .query(sqlQuery);

    if (result.recordset.length > 0) {
      req.usage = result.recordset; // Store result in req
      next(); // Proceed to the next middleware
    } else {
      return res
        .status(404)
        .json({ message: `Usage for ID '${req.params.id}' not found` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Create a New Product
export const createProduct = async (req, res) => {
  const sqlQuery = readSQLFile("database/create.sql"); // Read SQL query from file

  let pool;
  try {
    pool = await getConnection(); // Obtain the connection pool
    const result = await pool
      .request()
      .input("name", sql.VarChar, req.body.name)
      .input("desc", sql.VarChar(100), req.body.desc)
      .query(sqlQuery); // Execute the query

    console.log(req.body);

    // Release the connection
    pool.release();

    // Send response
    res.status(200).json({
      message: "Product created successfully",
      product: {
        name: req.body.name,
        desc: req.body.desc,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to create product" });
  } finally {
    if (pool) {
      try {
        await pool.close(); // Close the pool
      } catch (err) {
        console.error("Error closing the pool", err);
      }
    }
  }

  /* this would be placed in the body of the browser/post localhost:3000/products
    {
"name":"test",
"desc": "test desc"
}
*/
};

//Update a Product, id = /products/id
export const updateProduct = async (req, res) => {
  const sqlQuery = readSQLFile("database/update.sql"); // Read SQL query from file

  let pool;
  try {
    pool = await getConnection(); // Obtain the connection pool
    const id = req.params.id;
    const result = await pool
      .request()
      .input("name", sql.VarChar, req.body.name)
      .input("desc", sql.VarChar(100), req.body.desc)
      .query(sqlQuery); // Execute the query

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Could not update" });
    }
    console.log(req.body);
    //res.send("Creating product");
    res.json({
      name: req.body.name,
      desc: req.body.desc,
    });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ message: "Unable to Update" });
  } finally {
    if (pool) {
      try {
        await pool.close(); // Close the pool
      } catch (err) {
        console.error("Error closing the pool", err);
      }
    }
  }
};

//Delete a Product, id = /products/id
export const deleteProduct = async (req, res) => {
  const sqlQuery = readSQLFile("database/delete.sql"); // Read SQL query from file

  let pool;
  try {
    const pool = await getConnection(); // Obtain the connection pool
    const result = await pool
      .request()
      .input("id", sql.VarChar, req.params.id)
      .query(sqlQuery); // Execute the query

    console.log(result);
    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Could not Delete" });
    }

    return res.json({ message: "Product was Deleted!" });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ message: "Product not found" });
  } finally {
    if (pool) {
      try {
        await pool.close(); // Close the pool
      } catch (err) {
        console.error("Error closing the pool", err);
      }
    }
  }
};
