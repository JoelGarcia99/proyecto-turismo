const admin_validator = require('../middleware/admin_validator');
const db_connection = require('../middleware/dbconection');
const connect_mongo = require('../middleware/mongoconnection');
const Guide = require('./model/category');

const app = require('express')();

app.post('/category/', [db_connection, admin_validator, connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for guides collection in DB. If it does not exist it
  // is going to be created.
  const category_collection = mongo.collection('categories');

  // processing fields before storing on DB
  const categoru_model = new Guide(req.body, res);

  try {
    const insert_category = await category_collection.insertOne(categoru_model.save());

    return res.json({
      message: "Datos guardados correctamente",
      output: insert_category
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
