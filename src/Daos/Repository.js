import ContainerDaoFactory from "./Factory.js";

export default class ContainerRepository {
  #dao;

  constructor() {
    this.#dao = ContainerDaoFactory.getDao();
  }

  async getAll() {
    const contain = await this.#dao.getAll();
    return contain;
  }

  getById = async (idBuscado) => {
    const objObtenido = await this.#dao.getById(idBuscado);
    return objObtenido;
  };
  // async getById(idBuscado) {
  //   const objObtenido = await this.#dao.getById(idBuscado);
  //   return objObtenido;
  // }

  add = async ({ producto }) => {
    // console.log(producto);
    return await this.#dao.save(producto);
  };

  // async add({contenidoNuevo}) {
  //   await this.#dao.save(contenidoNuevo);
  // }
  removeById = async (idBuscado) => {
    const removida = await this.#dao.deleteById(idBuscado);
    return removida;
  };
  // async removeById(idBuscado) {
  //   const removida = await this.#dao.deleteById(idBuscado);
  //   return removida;
  // }

  async removeAll() {
    await this.#dao.deleteAll();
  }
}
