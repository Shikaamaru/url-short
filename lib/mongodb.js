// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;  // Make sure this is set in your environment variables
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();
const database = client.db("test");

export { database }
