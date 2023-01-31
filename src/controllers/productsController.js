import { Contenedor } from "../Containers/index.js";
const container = new Contenedor("productos");

export const getProducts = async (req, res) => {
  res.status(200).json(await container.getAll());
};

export const addProducts = async (req, res) => {
  const { title, price, thumbnail, id } = req.body;
  const product = {
    title,
    price,
    thumbnail,
    id,
  };
  res.status(200).json(await container.save(product));
};
