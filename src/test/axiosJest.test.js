const axios = require("axios");
const strictEqual = require("assert").strictEqual;
const deepStrictEqual = require("assert").deepStrictEqual;

const enviar = (productos) =>
  axios.post("http://localhost:8080/api/productos", productos);

const recibir = () => axios.get("http://localhost:8080/api/productos");

describe("api productos en memoria", () => {
  test("recibir productos vacio", async () => {
    const { data } = await recibir();
    deepStrictEqual(data, []);
  });

  test("enviar productos", async () => {
    const produ = {
      title: "tostadora",
      price: "6800",
      thumbnail: "https://www.google.com/tostadora.jpg",
    };
    await enviar(produ);

    const { data } = await recibir();
    deepStrictEqual(data, [{ id: 1, ...produ }]);
    strictEqual(data[0].title, "tostadora");
    strictEqual(data[0].price, "6800");
    strictEqual(data[0].thumbnail, "https://www.google.com/tostadora.jpg");
  });
});
