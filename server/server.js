
require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const DB = require("./db/conn");
const userDB = DB.getUserDB();

app.use(cors());
app.use(express.json());

app.route("/", (req, res) => {
  res.send("You've reached the server port. You shouldn't be here :)");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
