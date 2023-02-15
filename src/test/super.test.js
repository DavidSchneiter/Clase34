import request from "supertest";
import { expect } from "chai";
import { app } from "../serverExpress.js";

describe("Comprobando que el servidor funcione bien", function () {
  it("recibir vacio", async function () {
    const response = await request(app).get("/api/productos");
    expect(response.body).to.deep.equal([]);
    expect(response.status).to.equal(200);
  });

  it("guardar", async function () {
    const produ = {
      title: "tostadora",
      price: "6800",
      thumbnail: "https://www.google.com/tostadora.jpg",
    };
    const response = await request(app).post("/api/productos").send(produ);

    expect(response.body).to.equal("");
    expect(response.status).to.equal(200);
  });
});
