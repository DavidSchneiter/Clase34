import { Router } from "express";
import { randomController } from "../controllers/index.js";

export const randomApi = Router();

randomApi.get("/", randomController.randoms);
