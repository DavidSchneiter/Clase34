import { ContainerDaoFile, ContainerDaoMem } from "../Containers/index.js";
import { args } from "../utils/index.js";

const rutaArchivo = "productos";
const opcion = args.dao;

let dao;

export const getProductosSingletonMem = () => {
  return ContainerDaoMem.getInstancia();
};
export const getProductosSingletonFile = () => {
  return ContainerDaoFile.getInstancia(rutaArchivo);
};
switch (opcion) {
  case "File":
    dao = getProductosSingletonFile();
    await dao.init();
    console.log(ContainerDaoFile.getInstancia());
    console.log(ContainerDaoMem.getInstancia());
    break;
  default:
    dao = getProductosSingletonMem();
}

export default class ContainerDaoFactory {
  static getDao() {
    return dao;
  }
}
