import { Router } from "express";
import compression from "compression";
import { infoController } from "../controllers/index.js";

export const infoApi = Router();

infoApi.get("/", compression(), infoController.info);
