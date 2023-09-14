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
const database = client.db('socialstories');
const postCollection = database.collection('posts');


async function run() {
  try {
    await client.connect();
    await client.db("socialstories").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


const pinecone = new PineconeClient();
await pinecone.init({
  environment: process.env.PINECONE_ENVIRONMENT,
  apiKey: process.env.PINECONE_API_KEY,
});



const app = express();
app.use(express.json());
app.use(cors(["http://localhost:3000", "127.0.0.1", "https://ewrer234234.appspot.app.com"]));

app.use(morgan('combined'));




app.get("/api/v1/stories", async (req, res) => {

  const cursor = postCollection
    .find({})
    .sort({ _id: -1 });

  try {
    const allStories = await cursor.toArray();
    res.send(allStories);

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "failed to get stories, please try later" });
  }
});


app.get("/api/v1/search", async (req, res) => {

  const queryText = req.query.q;

  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: queryText,
  });
  const vector = response?.data[0]?.embedding
  console.log("vector: ", vector);
  // [ 0.0023063174, -0.009358601, 0.01578391, ... , 0.01678391, ]

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
  const queryResponse = await index.query({
    queryRequest: {
      vector: vector,
      // id: "vec1",
      topK: 20,
      includeValues: false,
      includeMetadata: true,
      namespace: process.env.PINECONE_NAME_SPACE
    }
  });

  queryResponse.matches.map(eachMatch => {
    console.log(`score ${eachMatch.score.toFixed(3)} => ${JSON.stringify(eachMatch.metadata)}\n\n`);
  })
  console.log(`${queryResponse.matches.length} records found `);

  res.send(queryResponse.matches)
});

app.post("/api/v1/story", async (req, res) => {

  try {
    const doc = {
      title: req?.body?.title,
      body: req?.body?.body,
      $currentDate: {
        createdOn: true
      },
    }

    const result = await postCollection.insertOne(doc);
    console.log("result: ", result);
    res.send({
      message: "story created successfully"
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ message: "Failed to add, please try later" })
  }
});

app.put("/api/v1/story/:id", async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(403).send({ message: "incorrect product id" });
    return;
  }

  let story = {}

  if (req.body.title) story.title = req.body.title;
  if (req.body.body) story.body = req.body.body;

  try {
    const updateResponse = await postCollection
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: story }
      );

    console.log("Product updated: ", updateResponse);

    res.send({
      message: "story updated successfully"
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "failed to update story, please try later" });
  }
});


app.delete("/api/v1/story/:id", async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(403).send({ message: "incorrect product id" });
    return;
  }

  try {
    const deleteResponse = await postCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    console.log("Product deleted: ", deleteResponse);

    res.send({
      message: "story deleted successfully"
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "failed to delete story, please try later" });
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
