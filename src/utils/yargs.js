// const yargs = require("yargs")(process.argv.slice(2));
import yargs from "yargs";
export const args = yargs(process.argv.slice(2))
  .alias({
    p: "port",
    m: "modo",
    d: "dao",
  })
  .default({ modo: "fork", port: "8080" }).argv;
