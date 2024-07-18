"use strict";

import { Router } from "express";
import {
  getMember,
  getUsage,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";

const router = Router();

//Pulls from Controller
router.get("/memberships/:id", getMember, getUsage);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
