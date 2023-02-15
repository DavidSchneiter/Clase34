import axios from "axios";
import { strictEqual, deepStrictEqual } from "assert";

const enviar = (productos) =>
  axios.post("http://localhost:8080/api/productos", productos);

const recibir = () => axios.get("http://localhost:8080/api/productos");

describe("api productos en memoria", () => {
  it("recibir productos vacio", async () => {
    const { data } = await recibir();
    deepStrictEqual(data, []);
  });

  it("enviar productos", async () => {
    const produ = {
      title: "tostadora",
      price: "6800",
      thumbnail: "https://www.google.com/tostadora.jpg",
    };
    await enviar(produ);

    const { data } = await recibir();
    deepStrictEqual(data, [produ]);
    strictEqual(data[0].title, "tostadora");
    strictEqual(data[0].price, "6800");
    strictEqual(data[0].thumbnail, "https://www.google.com/tostadora.jpg");
  });
});
