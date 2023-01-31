import { Router } from "express";
import { productController } from "../controllers/index.js";

export const productsApi = Router();

productsApi.get("/", productController.getProducts);

// productsApi.get("/:id", async (req, res) => {
//   const product = await container.getById(req.params.id);
//   if (product.length === 0) {
//     return res.status(404).json({ error: "producto no encontrado" });
//   }
//   res.status(200).json(await container.getById(req.params.id));
// });

productsApi.post("/", productController.addProducts);

// productsApi.put("/:id", async (req, res) => {
//   let resp = await container.getById(req.params.id);
//   let product = resp[0];

//   if (product.length === 0 || !product) {
//     return res.status(404).json({ error: "producto no encontrado" });
//   }

//   await container.deleteById(req.params.id);

//   const { title, price, thumbnail } = req.body;

//   product = {
//     title: title ? title : product.title,
//     price: price ? price : product.price,
//     thumbnail: thumbnail ? thumbnail : product.thumbnail,
//     id: parseInt(req.params.id),
//   };
//   res.status(200).json(await container.save(product));
// });

// productsApi.delete("/:id", async (req, res) => {
//   const product = await container.getById(req.params.id);
//   if (product.length === 0 || !product) {
//     return res.status(404).json({ error: "producto no encontrado" });
//   }
//   const resp = await container.deleteById(req.params.id);
//   res.status(200).json(resp);
// });
