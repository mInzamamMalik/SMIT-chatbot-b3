import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log("🚀 ~ file: server.mjs:7 ~ app.get ~ req:", req);
  res.send({ message: "Hello World! by Shehzad" });
});

app.get("/name/:myName", (req, res) => {
  const name = req.params.myName;

  console.log("🚀 ~ file: server.mjs:13 ~ app.get ~ name:", name);

  res.send({ message: `Hello World! by ${name}` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
