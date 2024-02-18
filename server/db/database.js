const {MongoClient} = require("mongodb");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const uri = "mongodb://mongo:27017";
const dbName = "users";
const client = new MongoClient(uri);

module.exports = {
    getUserDB: function(){
        return client.db(dbName);
    },
    genHash: function(plaintext){
        return bcrypt.hash(plaintext, bcrypt.genSalt(saltRounds));
    },
    checkPass: function(plaintext, hash){
        return bcrypt.compare(plaintext, hash);
    },
    insertUser: function(username, hash){
        // Only insert if username is unique
        return
    },
    getUser: function(username){
        return
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