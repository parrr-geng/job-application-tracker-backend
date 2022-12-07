const mongoose = require("mongoose");
const Job = require("../models/Job.model");

require("dotenv").config();
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/job-application-tracker";

const Jobs = [
    {
        "title": "Front End Developer",
        "description": "Work at the heart of Berlin"
    },
    {
        "title": "Back End Developer",
        "description": "Work from home"
    }
];

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true
})
  .then((x) => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
    return Job.create(Jobs);
  })
  .then((jobsFromDB) => {
    console.log(`Created ${jobsFromDB.length} Jobs`);

    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log("DB connection closed!");
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
