const admin_validator = require('../middleware/admin_validator');
const db_connection = require('../middleware/dbconection');
const session_validator = require('../middleware/jwt');
const connect_mongo = require('../middleware/mongoconnection');
const Reservation = require('./model/Reservation');
const ObjectID = require('mongodb').ObjectID;   
const app = require('express')();

// Gets all the reservations assigned to current admin/user in session
app.get('/reservations/assigned', [db_connection, session_validator], async(req, res)=>{

  const user = req.user;
  let condition = {};

  switch(user.role) {
    case "admin":
      condition.admin = user.__id;
      break;
    case "user":
    default:
      condition.user = user.__id;
  }

  try {
    const reservation_model = new Reservation({});
    const reservations = await reservation_model.loadAllFromDB(condition, {
      projection: {}
    });

    return res.json({
      message: "Datos cargados correctamente",
      reservations
    });
  }catch(e) {
    return res.status(400).json({
      message: "Hubo un problema cargando los datos",
      error: e.message
    });
  }
});

// Only gets pending reservations for administrators
app.get('/reservations/pending', [db_connection, admin_validator, connect_mongo], async(req, res)=>{

  try {
    const model = new Reservation({});
    const reservations = await model.loadAllFromDB({admin: null});

    return res.json({
      message: "Datos cargados correctamente",
      reservations
    });
  }catch(e) {
    return res.status(500).json({
      message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
      error: e.message
    });
  }
});

/**
 *
 * Fetchs all the data of a specific guide according to its slug
 */
app.get('/guide/:id', [connect_mongo], async(req, res)=>{

  const target_id = req.params.id;
  const mongo = req.mongoDB;
  
  // searching for guides-turisticos collection in DB. If it does not exist it
  // is going to be created.
  const guides_collection = mongo.collection('guides');

  try {
    // List of guides turisticos
    const guide = await guides_collection.findOne({_id: ObjectID(target_id)});

    if(!guide) {
      return res.status(404).json({
	message: "No se puedo obtener el guía",
	error: "Guía no encontrado"
      });
    }

    return res.json({
      message: "Datos cargados correctamente",
      punto: guide
    });
  }catch(e) {
    return res.status(500).json({
      message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
      error: e.message
    });
  }
});

module.exports = app;
