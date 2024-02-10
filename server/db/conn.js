const {MongoClient} = require("mongodb");

const uri = "mongodb://mongo:27017";
const dbName = "users";
const client = new MongoClient(uri);

module.exports = {
    getUserDB: function(){
        return client.db(dbName);
    }
}