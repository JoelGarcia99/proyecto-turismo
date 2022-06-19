const admin_validator = require('../middleware/admin_validator');
const db_connection = require('../middleware/dbconection');
const connect_mongo = require('../middleware/mongoconnection');
const ObjectID = require('mongodb').ObjectID;   

const app = require('express')();

app.delete('/guide/:id', [db_connection, admin_validator, connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for guidess-turisticos collection in DB. If it does not exist it
  // is going to be created.
  const guide_collection = mongo.collection('guides');

  try{
    // updating records
    const query = {_id: ObjectID(req.params.id) || "5-0 koketa"};

    const response_db = await guide_collection.deleteOne(query);

    if(response_db['deletedCount'] < 1) {
      return res.status(404).json({
	message: "No se eliminó nada",
	error: "Guía no encontrado"
      });
    }

    return res.json({
      message: "Guía eliminado correctamente",
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
