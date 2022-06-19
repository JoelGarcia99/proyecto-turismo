const admin_validator = require('../middleware/admin_validator');
const db_connection = require('../middleware/dbconection');
const connect_mongo = require('../middleware/mongoconnection');
const PuntoTuristico = require('./model/PuntoTuristico');
const ObjectID = require('mongodb').ObjectID;   

const app = require('express')();

app.put('/punto-turistico/:id', [db_connection, admin_validator, connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for puntos-turisticos collection in DB. If it does not exist it
  // is going to be created.
  const punto_turistico_collection = mongo.collection('puntos-turisticos');

  // using the model to purify fields
  const punto_model = new PuntoTuristico(req.body, res);

  // updating records
  const query = {_id: ObjectID(req.params.id) || "5-0 koketa"};
  const newValues = {$set: punto_model.save()};
  punto_turistico_collection.updateOne( query, newValues, (err, out)=>{
    if(err) {
      return res.status(500).json({
	message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
	error: err
      });
    }

    return res.json({
      message: "Punto turístico actualizado correctamente",
      output: out
    });
  });
});

module.exports = app;
