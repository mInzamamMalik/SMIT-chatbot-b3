import express from "express";
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890', 20)
import { MongoClient, ObjectId } from "mongodb"
import morgan from 'morgan';
import cors from 'cors'
import path from 'path';
const __dirname = path.resolve();
import { PineconeClient } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import "dotenv/config.js";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

import './config/index.mjs'

const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.9ha3mra.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(mongodbURI);
const database = client.db('ecom');
const productsCollection = database.collection('products');


const app = express();
app.use(express.json());
app.use(cors(["http://localhost:3000", "127.0.0.1", "https://ewrer234234.appspot.app.com"]));

app.use(morgan('combined'));




app.get("/api/v1/stories", async (req, res) => {

  res.send(
    [{
      _id: "dfsafsqwerwqr4534252345",
      title: "abc story",
      body: "abc story body abc product",
      createdOn: "2022-03-20T12:00:00.000Z",
    }, {
      _id: "dfsafsqwerwqr4534252345",
      title: "abc story",
      body: "abc story body abc product",
      createdOn: "2022-03-20T12:00:00.000Z",
    }]

  )
});

app.post("/api/v1/story", async (req, res) => {

  res.send({
    message: "story created successfully"
  });

});

app.put("/api/v1/story/:id", async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(403).send({ message: "incorrect product id" });
    return;
  }

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
    return;
  }

  let product = {}

  // req.body.name && (product.name = req.body.name);

  if (req.body.name) product.name = req.body.name;
  if (req.body.price) product.price = req.body.price;
  if (req.body.description) product.description = req.body.description;

  try {
    const productData = await productsCollection
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: product }
      );

    console.log("Product updated: ", productData);

    res.send({
      message: "product updated successfully"
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "failed to update product, please try later" });
  }

});

app.delete("/api/v1/story/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(403).send({ message: "incorrect product id" });
    return;
  }

  try {
    const productData = await productsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    console.log("Product deleted: ", productData);

    res.send({
      message: "product deleted successfully"
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "failed to delete product, please try later" });
  }
});

//  baseurl/filename.txt
app.get(express.static(path.join(__dirname, "./web/build")));
app.use("/", express.static(path.join(__dirname, "./web/build")));

// /Users/malik/Desktop/_CLASS/SMIT-chatbot-b3/04. nodejs/2. crud operation
app.use('/static', express.static(path.join(__dirname, 'static')))


app.use((req, res) => {
  res.status(404).send("not found");
})


const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
