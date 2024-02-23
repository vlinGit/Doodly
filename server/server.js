require("dotenv").config({ path: "./.env" });
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const DB = require("./db/database");
const cookieParser = require('cookie-parser');
const session = require('express-session');

// ERROR CODES:
//  1x -> error with account creation
//    11 -> username taken
//    12 -> invalid email 
//    13 -> email taken
//    14 -> invalid password
//  2x -> error with login
//    21 -> incorrect credentials
//  3x -> error with canvas
//    31 -> couldn't save, no space
//    32 -> couldn't load, not found

app.use(cors({
  origin: ["http://localhost:8000"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "secret",
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 90000
  }
}))
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("You've reached the server port. You shouldn't be here :)");
});

app.post("/signup", async (req, res) => {
  const data = req.body;
  var code;
  var message;
  var error = false;
  await DB.getUserByEmail(data.email).then((result) => {
    if (result){
      code = 400;
      message = "Email exists";
      error = true;
    }else if(!DB.checkValidEmail(data.email)){
      code = 400;
      message = "Invalid email";
      error = true;
    }
  });
  await DB.getUserByName(data.username).then((result) => {
    if (result){
      code = 400;
      message = "User exists";
      error = true;
    }
  });

  if (!DB.checkValidPass(data.password)){
    code = 400;
    message = "Invalid password";
    error = true;
  }

  if (!error){
    const authToken = Math.random().toString(36);
    DB.insertUser(data.username, data.password, data.email, await bcrypt.hash(authToken, 10));
    res.cookie("authToken", authToken).send({"message": "Account created"});
  }else{
    res.status(400).send({"message": message});
  }
})

app.post("/login", async (req, res) => {
  const data = req.body;

  await DB.getUserByName(data.username).then((result) => {
    if (result){
      bcrypt.compare(data.password, result.password).then((checkResult) => {
        if (checkResult){
          res.cookie("authToken", result.authToken).send({"message": "Login success"});
        }else{
          res.status(400).send({"message": "Invalid credentials"});
        }
      });
    }else{
      res.status(400).send({"message": "Invalid credentials"});
    }
  });
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// helpers
function get(data, key, defaultVal){
  const retrieved = data[key];
  return (typeof retrieved !== undefined) ? retrieved : defaultVal;
}
