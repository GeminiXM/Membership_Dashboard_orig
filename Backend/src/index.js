"use strict";
import app from "./app.js";

app.get("/", (req, res) => {
  console.log(req.url); // Access the URL requested by the client
  res.json;
  res.send("Hello World");
});

/* app.get("/api", (req,res) => {
  res.json
}) */

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST_URL;

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}`);
});
