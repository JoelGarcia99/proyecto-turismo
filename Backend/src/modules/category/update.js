const admin_validator = require('../middleware/admin_validator');
const db_connection = require('../middleware/dbconection');
const connect_mongo = require('../middleware/mongoconnection');
const Guide = require('./model/category');
const ObjectID = require('mongodb').ObjectID;   

const app = require('express')();

app.put('/category/:id', [db_connection, admin_validator, connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for categories collection in DB. If it does not exist it
  // is going to be created.
  const category_collection = mongo.collection('categories');

  try{
    // updating records
    const query = {_id: ObjectID(req.params.id) || "5-0 koketa"};

    // using the model to purify fields
    const category_model = new Guide(req.body, res);

    const newValues = {$set: category_model.save()};
    const response_db = await category_collection.updateOne(query, newValues);

    return res.json({
      message: "Categoría actualizado correctamente",
      output: response_db
    });
  }catch(e) {
      return res.status(500).json({
	message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
	error: e.message
      });
  }
});

module.exports = app;