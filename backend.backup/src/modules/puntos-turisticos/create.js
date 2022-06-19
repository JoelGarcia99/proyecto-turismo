const admin_validator = require('../middleware/admin_validator');
const db_connection = require('../middleware/dbconection');
const connect_mongo = require('../middleware/mongoconnection');
const PuntoTuristico = require('./model/PuntoTuristico');

const app = require('express')();

app.post('/punto-turistico/', [db_connection, admin_validator, connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for puntos-turisticos collection in DB. If it does not exist it
  // is going to be created.
  const punto_turistico_collection = mongo.collection('puntos-turisticos');

  // defining unique constraint
  punto_turistico_collection.createIndex( {slug: 1, name: 1} , {unqiue : true} );


  const punto_model = new PuntoTuristico(req.body, res);

  try {
    const insert_punto = await punto_turistico_collection.insertOne(punto_model.save());

    return res.json({
      message: "Datos guardados correctamente",
      output: insert_punto
    });
  }catch(e) {
    return res.status(500).json({
      message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
      error: e
    });
  }
});

module.exports = app;
