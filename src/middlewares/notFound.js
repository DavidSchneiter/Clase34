import { logger } from "../utils/index.js";

export const notFoundMiddleware = (req, res, next) => {
  if (res.status(404)) {
    logger.warn(`Page not found, Url:  ${req.url}, metodo: ${req.method}`);
  }

  next();
};
