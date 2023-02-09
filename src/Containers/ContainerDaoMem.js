import { logger } from "../utils/index.js";

let instacia = null;
export class ContainerDaoMem {
  static instancia;
  constructor() {
    this.contain = [];
  }
  static getInstancia = () => {
    if (!instacia) instacia = new ContainerDaoMem();
    return instacia;
  };

  init() {
    logger.info("personas dao en memoria -> listo");
  }

  disconnect() {
    logger.info("personas dao en memoria -> cerrado");
  }

  #getIndex(id) {
    return this.contain.findIndex((persona) => persona.id === id);
  }

  getAll() {
    return this.contain;
  }

  getById(idBuscado) {
    return this.contain[this.#getIndex(idBuscado)];
  }

  save(contenidoNuevo) {
    this.contain.push(contenidoNuevo);
    return contenidoNuevo;
  }

  deleteById(idParaBorrar) {
    const [borrada] = this.contain.splice(this.#getIndex(idParaBorrar), 1);
    return borrada;
  }

  deleteAll() {
    this.contain = [];
  }

  updateById(idParaReemplazar, contenidoNuevo) {
    const index = this.#getIndex(idParaReemplazar);
    const actualizada = { ...this.contain[index], ...contenidoNuevo };
    this.contain.splice(index, 1, actualizada);
    return actualizada;
  }
}
