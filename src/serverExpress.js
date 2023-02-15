import express from "express";
import { engine } from "express-handlebars";
import cluster from "cluster";
import { cpus } from "os";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import * as dotenv from "dotenv";
import { Strategy as localStrategy } from "passport-local";
dotenv.config();

import { infoApi, productsApi, randomApi, viewsApi } from "./router/index.js";
import { mongoSession, notFoundMiddleware } from "./middlewares/index.js";
import { dbConnection } from "./db/configMongo.js";
import { args, logger } from "./utils/index.js";
import { strategy } from "./passport/index.js";
import { User } from "./models/User.js";

export const app = express();

app.use(session(mongoSession));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);
passport.use(
  "login",
  new localStrategy({ passReqToCallback: true }, strategy.login)
);

passport.use(
  "register",
  new localStrategy({ passReqToCallback: true }, strategy.register)
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.set("view engine", "hbs");
app.set("views", "./views");

app.use("/", viewsApi);
app.use("/api/productos", productsApi);
app.use("/api/random", randomApi);
app.use("/info", infoApi);
app.use(notFoundMiddleware);

if (args.modo == "CLUSTER" && cluster.isPrimary) {
  const lengthCpu = cpus.length;
  for (let index = 0; index < lengthCpu; index++) {
    cluster.fork();
  }
} else {
  const server = app.listen(process.env.PORT, async () => {
    logger.info(
      `Servidor de exprees ejecutandose en el puerto ${process.env.PORT}`
    );
    dbConnection();
  });

  server.on("error", (error) => logger.error(`Erorr en el servidor ${error}`));
}

// const server = app.listen(PORT, async () => {
//   logger.info(`Servidor de exprees ejecutandose en el puerto ${PORT}`);
//   try {
//     await mongoose.connect(process.env.MONGO_DB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     logger.info("Mongo Connect");
//   } catch (err) {
//     logger.error("Error" + err);
//   }
// });

// server.on("error", (error) => logger.error(`Erorr en el servidor ${error}`));
