import { fork } from "child_process";
import { random } from "../utils/index.js";

export const randoms = (req, res) => {
  const params = req.query.cant || 10000;
  // const child = fork("src/utils/child.js", [params]);
  // child.on("message", (msg) => {
  //   if (msg == "ready") {
  //     console.log(msg);
  //     child.send({ PID: process.pid });
  //   } else res.send(msg);
  // });
  res.send(random(params));
};
