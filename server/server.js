
require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const DB = require("./db/database");
const userDB = DB.getUserDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("You've reached the server port. You shouldn't be here :)");
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.send("Triggered signup");
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
