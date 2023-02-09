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

  async getById(idBuscado) {
    const objObtenido = await this.#dao.getById(idBuscado);
    return objObtenido;
  }

  async add(contenidoNuevo) {
    await this.#dao.save(contenidoNuevo);
  }

  async removeById(idBuscado) {
    const removida = await this.#dao.deleteById(idBuscado);
    return removida;
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }
}
