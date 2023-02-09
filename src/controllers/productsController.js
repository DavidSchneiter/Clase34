import ContainerRepository from "../Daos/Repository.js";
const productsContainer = new ContainerRepository();

export const getProducts = async (req, res) => {
  res.status(200).json(await productsContainer.getAll());
};

export const addProducts = async (req, res) => {
  const { title, price, thumbnail, id } = req.body;
  const product = {
    title,
    price,
    thumbnail,
    id,
  };
  res.status(200).json(await productsContainer.add(product));
};
