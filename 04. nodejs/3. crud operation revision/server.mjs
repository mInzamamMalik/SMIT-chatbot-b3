import express from "express";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 20);

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

// console.log("testing nanoid : ",nanoid());

const products = [
  {
    id: "16", // always a number
    name: "abc product",
    price: "$23.12",
    description: "abc product description",
  },
  {
    id: "17", // always a number
    name: "good product",
    price: "$59.12",
    description: "something product description",
  },
];

// console.log("🚀 ~ file: server.mjs:28 ~ products:", products)

const myObj = {
  message: "all products testing",
  data: products,
};

app.get("/products", (req, res) => {
  res.send(myObj);
});

//  https://baseurl.com/product/1231

app.get("/product/:shehzad", (req, res) => {
  const id = req.params.shehzad;
  console.log("id", id);
  console.log("id type", typeof id);

  let isFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      console.log("product mil gye");
      isFound = i;
      break;
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({
      message: "product not found",
    });
  } else {
    res.send({
      message: "product found with id: " + isFound,
      data: products[isFound],
    });
  }
});

app.post("/product", (req, res) => {
  // {
  //   id: 212342, // always a number
  //   name: "abc product",
  //   price: "$23.12",
  //   description: "abc product description"
  // }

  if (!req.body.name || !req.body.price || !req.body.description) {
    res.status(403).send(`
      required parameter missing. example JSON request body:
      {
        name: "abc product",
        price: "$23.12",
        description: "abc product description"
      }`);
      return;
  }
 
  console.log("testing");
  res.send("validation pass");
  return;

  products.push({
    id: nanoid(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });

  res.status(201).send({ message: "created product" });
});

app.put("/product/:id", (req, res) => {
  if (!req.body.name && !req.body.price && !req.body.description) {
    res.status(403).send(`
      required parameter missing. 
      atleast one parameter is required: name, price or description to complete update
      example JSON request body:
      {
        name: "abc product",
        price: "$23.12",
        description: "abc product description"
      }`);
  }

  let isFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      isFound = i;
      break;
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({
      message: "product not found",
    });
  } else {
    if (req.body.name) products[isFound].name = req.body.name;
    if (req.body.price) products[isFound].price = req.body.price;
    if (req.body.description)
      products[isFound].description = req.body.description;

    res.send({
      message: "product is updated with id: " + products[isFound].id,
      data: products[isFound],
    });
  }
});

app.delete("/product/:id", (req, res) => {
  let isFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      isFound = i;
      break;
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({
      message: "product not found",
    });
  } else {
    products.splice(isFound, 1);

    res.send({
      message: "product is deleted",
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
