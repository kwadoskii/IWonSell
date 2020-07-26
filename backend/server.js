const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 9000;
const uri = process.env.ATLAS_URI;

//importing routes
const routes = require("./routes");

//express middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//connect to mongodb
mongoose.connect(uri, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.openUri("open", () => {
  console.log("Message: MongoDB database connection established");
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
