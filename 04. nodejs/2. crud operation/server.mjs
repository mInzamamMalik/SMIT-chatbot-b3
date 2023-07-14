import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.send("hello world!");
});



let products = [
  {
    id: 212342,
    name: "abc product",
    price: "$23.12",
    description: "abc product description"
  }
];


app.get("/products", (req, res) => {
  res.send("hello world!");
});

//  https://baseurl.com/product/1231
app.get("/product/:id", (req, res) => {
  console.log(req.params.id)
  res.send("hello world!");
});

app.post("/product", (req, res) => {
  res.send("hello world!");
});

app.put("/product/:id", (req, res) => {
  res.send("hello world!");
});

app.delete("/product/:id", (req, res) => {
  res.send("hello world!");
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
