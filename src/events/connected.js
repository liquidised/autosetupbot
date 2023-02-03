const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
mongoose.set("strictQuery", false);
require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await MongoClient.connect(process.env.mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoose.connect(process.env.mongo || "", {
      keepAlive: true,
    });

    if (mongoose.connect) {
      console.log("Mongoose connection succesful.");
      if (MongoClient.connect) {
        console.log("MongoDB connection succesful.");
      }
    }
  },
};
