import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import ContainerRepository from "../Daos/Repository.js";

const schema = buildSchema(`
    input ProductoInput {
        title: String,
        price: Int,
        thumbnail: String,
    }
    type Producto {
        id: ID!,
        title: String,
        price: Int,
        thumbnail: String,
    }
    type Query {
        getProducto(id: ID!): Producto,
        getProductos: [Producto],
    }
    type Mutation {
        addProducto(producto: ProductoInput): Producto,
        deleteProducto(id: ID!): Producto,
        deleteProductos:[Producto],
    }
`);

export class GraphQLController {
  constructor() {
    const api = new ContainerRepository();
    return graphqlHTTP({
      schema: schema,
      rootValue: {
        getProducto: api.getById,
        getProductos: api.getAll(),
        addProducto: api.add,
        deleteProducto: api.removeById,
        deleteProductos: api.removeAll(),
      },
      graphiql: true,
    });
  }
}
