"use strict";
// Other middleware and routes...
import express from "express";
import productRoutes from "./routes/products.routes.js";
import cors from "cors";

const app = express();

// Enable CORS for all routes - this allows the frontend to talk to the backend api
app.use(cors());

app.use(express.json()); //so it understand entries from the body for create
app.use(productRoutes);

export default app;
