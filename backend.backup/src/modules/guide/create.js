const admin_validator = require('../middleware/admin_validator');
const db_connection = require('../middleware/dbconection');
const connect_mongo = require('../middleware/mongoconnection');
const Guide = require('./model/guide');

const app = require('express')();

app.post('/guide/', [db_connection, admin_validator, connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for guides collection in DB. If it does not exist it
  // is going to be created.
  const guide_collection = mongo.collection('guides');

  // processing fields before storing on DB
  const guide_model = new Guide(req.body, res);

  try {
    const insert_guide = await guide_collection.insertOne(guide_model.save());

    return res.json({
      message: "Datos guardados correctamente",
      output: insert_guide
    });
  }catch(e) {
    console.error(e);
    return res.status(400).json({
      message: "Hubo un problema guardando los datos",
      error: e.message
    });
  }
});

module.exports = app;
