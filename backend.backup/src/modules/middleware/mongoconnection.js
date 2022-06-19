const { MongoClient } = require('mongodb');

// Connection URL
const url = process.env.MONGO_URL_CONN;
const client = new MongoClient(url);

const dbName = process.env.MONGO_DB_NAME

console.log("Trying to connect to mongo using:", url);

const connect_mongo = (req, _, next) => {
  // Use connect method to connect to the server
  client.connect().then((client)=>{
    const db = client.db(dbName);
    req.mongoDB = db;
    next();
  });
}


module.exports = connect_mongo;
