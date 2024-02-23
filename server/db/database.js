const {MongoClient} = require("mongodb");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const uri = "mongodb://mongo:27017";
const client = new MongoClient(uri); 
const minPasswordLen = 8;
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
var db;
var userDB;

try{
    client.connect();
    db = client.db("database");
    userDB = db.collection("users");
}catch (error){
    console.log("Could not create mongo service");
    console.log(error);
}


module.exports = {
    genHash: async function(plaintext){
        const hash = await bcrypt.hash(plaintext, await bcrypt.genSalt(saltRounds));
        return hash;
    },
    checkValidEmail: function(email){
        return email.toLowerCase().match(emailReg);
    },
    checkValidPass: function(password){
        return password.match(passwordReg);
    },
    checkPass: async function(plaintext, hash){
        return await bcrypt.compare(plaintext, hash);
    },
    insertUser: async function(username, plaintext, email, authToken){
        // Should probably move checks for username and email here
        const hashedPass = await this.genHash(plaintext)
        userDB.insertOne({"username": username, "password": hashedPass, "email": email, "authToken": authToken});
    },
    getUserByName: function(username){
        return userDB.findOne({"username": username});
    },
    getUserByEmail: async function(email){
        return userDB.findOne({"email": email});
    },
    getUserByAuthToken: function(authToken){
        return userDB.findOne({"authToken": authToken})
    },
    getUsers: function(){
        return
    },
    insertPhoto: function(username, photoData, photoID){
        // Only insert if the user has not reached their max save limit
        // Each photo will have a unique photoID, probably just use a random hash value; if the hash exists just generate until it doesn't
        return
    },
    getPhotos: function(username){
        // returns all photos from a specified user
        return
    },
    getPhoto: function(photoID){
        //returns a photo based on the provieded photoID
        return
    }
}