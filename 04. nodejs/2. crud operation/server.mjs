import express from "express";
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890', 20)


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});



let products = [
  {
    id: nanoid(), // always a number
    name: "abc product",
    price: "$23.12",
    description: "abc product description"
  }
];

app.get("/products", (req, res) => {
  res.send({
    message: "all products",
    data: products
  });
});

//  https://baseurl.com/product/1231
app.get("/product/:id", (req, res) => {
  console.log(typeof req.params.id)

  if (isNaN(req.params.id)) {
    res.status(403).send("invalid product id")
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
      message: "product not found"
    });
  } else {
    res.send({
      message: "product found with id: " + products[isFound].id,
      data: products[isFound]
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


  if (!req.body.name
    || !req.body.price
    || !req.body.description) {

    res.status(403).send(`
      required parameter missing. example JSON request body:
      {
        name: "abc product",
        price: "$23.12",
        description: "abc product description"
      }`);
  }

  products.push({
    id: nanoid(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });


  res.status(201).send({ message: "created product" });
});

app.put("/product/:id", (req, res) => {

  if (
    !req.body.name
    && !req.body.price
    && !req.body.description) {

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
      message: "product not found"
    });
  } else {

    if (req.body.name) products[isFound].name = req.body.name
    if (req.body.price) products[isFound].price = req.body.price
    if (req.body.description) products[isFound].description = req.body.description

    res.send({
      message: "product is updated with id: " + products[isFound].id,
      data: products[isFound]
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
      message: "product not found"
    });
  } else {
    products.splice(isFound, 1)

    res.send({
      message: "product is deleted"
    });
  }
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
