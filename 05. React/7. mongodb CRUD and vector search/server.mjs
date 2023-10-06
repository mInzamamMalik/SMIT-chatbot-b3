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

const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.rmbc6xu.mongodb.net/?retryWrites=true&w=majority`
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

app.use("/webhook", (req, res, next) => {

  const params = req.body.sessionInfo.parameters;

  const { guestname, numberofguests, roomtype } = params;

  console.log("guest name: ", guestname);
  console.log("Number of guests: ", numberofguests);
  console.log("Type of room: ", params.roomtype);

  const body = {
    detectIntentResponseId: '4dd48764-d86c-4d2c-a319-26447fa40e95',
    intentInfo: {
      lastMatchedIntent: 'projects/chatbotdemo-mykk/locations/us-central1/agents/0ceea8d4-84ab-407a-af7f-d01cd135841d/intents/c6585558-9cd8-458a-91a6-09081c27a309',
      displayName: 'confirmation.yes',
      confidence: 1
    },
    pageInfo: {
      currentPage: 'projects/chatbotdemo-mykk/locations/us-central1/agents/0ceea8d4-84ab-407a-af7f-d01cd135841d/flows/00000000-0000-0000-0000-000000000000/pages/a059d196-a603-41ba-bc0c-f4cd67602fb8',
      formInfo: {},
      displayName: 'Booking Confirmation Page'
    },
    sessionInfo: {
      session: 'projects/chatbotdemo-mykk/locations/us-central1/agents/0ceea8d4-84ab-407a-af7f-d01cd135841d/sessions/ec1130-477-ead-eb0-cf69558fb',
      parameters: { guestname: [Object], numberofguests: 2, roomtype: 'business' }
    },
    fulfillmentInfo: { tag: 'abc' },
    text: 'yes',
    languageCode: 'en'
  }


  res.send({
    "fulfillmentResponse": {
      "messages": [
        {
          "responseType": "RESPONSE_TYPE_UNSPECIFIED",
          "text": {
            "text": [
              `Dear ${guestname.original}, your booking of ${roomtype} room for ${numberofguests} person is confirmed. `
            ],
            "allowPlaybackInterruption": false
          }
        },
        {
          "responseType": "RESPONSE_TYPE_UNSPECIFIED",
          "text": {
            "text": ["We wish you good stay."],
            "allowPlaybackInterruption": false
          }
        }
      ],
      "mergeBehavior": "MERGE_BEHAVIOR_UNSPECIFIED"
    }
  })
})


app.get("/api/v1/stories", async (req, res) => {
  const cursor = postCollection
    .find({})
    .sort({ _id: -1 })
    .project({ plot_embedding: 0 })

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


  const documents = await postCollection.aggregate([
    {
      "$search": {
        "index": "default",
        "knnBeta": {
          "vector": vector,
          "path": "plot_embedding",
          "k": 2147483647
        },
        "scoreDetails": true
      }
    },
    {
      "$project": {
        "plot_embedding": 0,
        "score": { "$meta": "searchScore" },
        "scoreDetails": { "$meta": "searchScoreDetails" }
      },

    }
  ]).toArray();


  res.send(documents)
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
