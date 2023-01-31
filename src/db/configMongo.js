import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", true);

import { logger } from "../utils/index.js";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Mongo Connect");
  } catch (err) {
    logger.error("Error" + err);
  }
};
