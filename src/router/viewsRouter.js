import { Router } from "express";
import passport from "passport";

import { Authenticated } from "../middlewares/index.js";
import { viewsController } from "../controllers/index.js";

export const viewsApi = Router();

viewsApi.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  viewsController.redirect
);

viewsApi.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  viewsController.redirect
);

viewsApi.get("/failregister", viewsController.failRegister);

viewsApi.get("/faillogin", viewsController.failLogin);

viewsApi.get("/register", viewsController.renderRegister);

viewsApi.get("/logout", viewsController.logout);

viewsApi.get("/login", Authenticated, viewsController.renderLogin);

viewsApi.get("/", Authenticated, viewsController.redirectLogin);

// viewsApi.get("/", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//   if (!req.session.user) {
//     res.redirect("/login");
//   }
//   res.render("forms", { user: req.session.user });
// });

// viewsApi.get("/login", (req, res) => {
//   res.render("login", { user: req.session.user });
// });

// viewsApi.post("/login", (req, res) => {
//   const { usuario } = req.body;
//   req.session.user = usuario;
//   console.log(req.session);
//   res.redirect("/");
// });

// viewsApi.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// });

viewsApi.post("/productos", viewsController.redirectProducts);

viewsApi.get("/productos", viewsController.renderProducts);
