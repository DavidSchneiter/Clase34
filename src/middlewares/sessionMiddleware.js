import MongoStore from "connect-mongo";
import * as dotenv from "dotenv";
dotenv.config();

const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const mongoSession = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_DB_URI,
    advancedOptions,
    ttl: 10,
    collectionName: "session",
    autoRemove: "native",
  }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600 * 24 * 60,
  },
};
