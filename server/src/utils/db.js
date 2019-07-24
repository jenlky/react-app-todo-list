const mongoose = require("mongoose");
let dbURI;

switch (process.env.ENVIRONMENT) {
  case "production":
    dbURI = process.env.MONGODB_URI;
  default:
    dbURI = global.__MONGO_URI__ || "mongodb://localhost:27017/todolist";
}

mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
});
