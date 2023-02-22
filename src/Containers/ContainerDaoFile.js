import * as fs from "fs";
import { logger } from "../utils/index.js";

let instacia = null;
export class ContainerDaoFile {
  #ready = false;
  static instancia;
  constructor(ruta) {
    this.contain = [];
    this.id = 0;
    this.ruta = `./src/db/${ruta}.txt`;
  }
  static getInstancia = (ruta) => {
    if (!instacia) instacia = new ContainerDaoFile(ruta);
    return instacia;
  };

  async init() {
    try {
      await fs.promises.readFile(this.ruta, "utf-8");
      this.#ready = true;
      logger.info("personas dao en archivo -> listo");
    } catch (error) {
      await fs.promises.writeFile(this.ruta, "[]");
      this.#ready = true;
      logger.info("personas dao en archivo -> listo");
    }
  }

  disconnect() {
    logger.info("personas dao en archivo -> cerrado");
  }

  #checkReady() {
    if (!this.#ready) throw new Error("INTERNAL_ERROR: dao no conectado!");
  }

  async #leerArchivo() {
    this.#checkReady();
    const datos = await fs.promises.readFile(this.ruta, "utf-8");
    this.personas = JSON.parse(datos);
  }
  async #escribirArchivo() {
    this.#checkReady();
    const datos = JSON.stringify(this.contain, null, 2);
    await fs.promises.writeFile(this.ruta, datos);
  }
  async save(obj) {
    if (!obj.id) {
      this.id++;
      obj.id = this.id;
    }
    await this.#leerArchivo();
    this.contain.push(obj);
    this.contain.sort((a, b) => {
      return a.id - b.id;
    });
    try {
      await this.#escribirArchivo();
      return obj;
      // return `Id asignado al producto ${obj.title}: ${obj.id}`;
    } catch (error) {
      throw new Error("Imposible guardar", error);
    }
  }
  async getById(id) {
    try {
      await this.#leerArchivo();
      return this.contain.find((e) => {
        return e.id == parseInt(id);
      });
    } catch (error) {
      throw new Error("Imposible leer archivo", error);
    }
  }
  // async changeById(id, d1, d2, d3) {
  //   try {
  //     const data = await this.getById(id);
  //     return data = {

  //     }
  //   } catch (error) {

  //   }
  // }
  async getAll() {
    try {
      await this.#leerArchivo();
      if (!this.contain) return "Archivo vacio";
      return this.contain;
    } catch (error) {
      throw new Error("Imposible leer archivo", error);
    }
  }
  async deleteById(id) {
    try {
      await this.#leerArchivo();
      const newData = this.contain.filter((e) => {
        return e.id !== parseInt(id);
      });
      this.contain = newData;
      this.#escribirArchivo();
      return newData;
    } catch (error) {
      throw new Error("Imposible leer archivo", error);
    }
  }

  async deleteAll() {
    try {
      await this.#leerArchivo();
      this.contain = [];
      this.#escribirArchivo();
      return this.contain;
    } catch (error) {
      throw new Error("Imposible leer archivo", error);
    }
  }
}
