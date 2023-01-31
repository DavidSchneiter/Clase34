import { Router } from "express";

import { Contenedor } from "../Containers/index.js";
const container = new Contenedor("productos");

export const viewsApi = Router();

export const redirect = (req, res) => {
  res.redirect("/");
};

export const failRegister = (req, res) => {
  res.render("partials/register-error", {});
};

export const failLogin = (req, res) => {
  res.render("partials/login-error", {});
};
export const renderRegister = (req, res) => {
  res.render("register");
};
export const logout = (req, res) => {
  const { username } = req.user;
  req.logout(req.user, (err) => {
    if (err) return err;
    res.redirect("/");
  });
  res.render("logout", { username });
};

export const renderLogin = (req, res) => {
  res.render("login");
};

export const redirectLogin = (req, res) => {
  res.redirect("/login");
};

export const redirectProducts = async (req, res) => {
  const { title, price, thumbnail } = req.body;

  await container.save({ title, price, thumbnail });

  res.redirect("/");
};

export const renderProducts = async (req, res) => {
  const productos = await container.getAll();
  res.render("table", { products: productos });
};
