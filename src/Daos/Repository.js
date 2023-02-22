import ContainerDaoFactory from "./Factory.js";

export default class ContainerRepository {
  #dao;

  constructor() {
    this.#dao = ContainerDaoFactory.getDao();
  }

  getAll = async () => {
    const contain = await this.#dao.getAll();
    return contain;
  };

  // async getAll() {
  //   const contain = await this.#dao.getAll();
  //   return contain;
  // }

  getById = async ({ id }) => {
    console.log(id);
    const objObtenido = await this.#dao.getById(id);
    console.log({ objObtenido });
    return objObtenido;
  };
  // async getById(idBuscado) {
  //   const objObtenido = await this.#dao.getById(idBuscado);
  //   return objObtenido;
  // }

  add = async ({ producto }) => {
    return await this.#dao.save(producto);
  };

  // async add( producto ) {
  //   return await this.#dao.save(producto);
  // }

  removeById = async ({ id }) => {
    const removida = await this.#dao.deleteById(id);
    return removida;
  };
  // async removeById(idBuscado) {
  //   const removida = await this.#dao.deleteById(idBuscado);
  //   return removida;
  // }

  removeAll = async () => {
    await this.#dao.deleteAll();
  };

  // async removeAll() {
  //   await this.#dao.deleteAll();
  // }
}
