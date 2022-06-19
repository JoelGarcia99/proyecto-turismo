const admin_validator = require('../middleware/admin_validator');
const db_connection = require('../middleware/dbconection');
const connect_mongo = require('../middleware/mongoconnection');
const ObjectID = require('mongodb').ObjectID;   
const app = require('express')();

/**
 * Only administrators can get the full list of turistic points, normal users
 * only can see turistic points that are currently available.
 *
 **/
app.get('/manage/puntos-turisticos/', [db_connection, admin_validator, connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for puntos-turisticos collection in DB. If it does not exist it
  // is going to be created.
  const punto_turistico_collection = mongo.collection('puntos-turisticos');

  // list of fields to show/not show
  const projection = {
    media: 0,
    guides: 0
  }

  try {
    // List of puntos turisticos
    const puntos_list = await punto_turistico_collection.find({}).project(projection).toArray();

    return res.json({
      message: "Datos cargados correctamente",
      puntos: puntos_list
    });
  }catch(e) {
    return res.status(500).json({
      message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
      error: e
    });
  }
});

/**
 * Gets all the reservables turistic points
 **/
app.get('/puntos-turisticos/reservables', [connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for puntos-turisticos collection in DB. If it does not exist it
  // is going to be created.
  const punto_turistico_collection = mongo.collection('puntos-turisticos');

  // list of fields to show
  const projection = {
    media: 0
  }

  try {
    const query = {
      allow_reservation:true
    };


    // List of puntos turisticos
    const puntos_list = await punto_turistico_collection.find(query).project(projection).toArray();

    return res.json({
      message: "Datos cargados correctamente",
      puntos: puntos_list
    });
  }catch(e) {
    return res.status(500).json({
      message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
      error: e
    });
  }
});
/**
 * showing available turistic points
 *
 **/
app.get('/punto-turistico/', [connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for puntos-turisticos collection in DB. If it does not exist it
  // is going to be created.
  const punto_turistico_collection = mongo.collection('puntos-turisticos');

  // list of fields to show
  const projection = {
    media: 0
  }

  try {
    // List of puntos turisticos
    const puntos_list = await punto_turistico_collection.find({}).project(projection).toArray();

    return res.json({
      message: "Datos cargados correctamente",
      puntos: puntos_list
    });
  }catch(e) {
    return res.status(500).json({
      message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
      error: e
    });
  }
});


app.get('/punto-turistico/manage/:id', [connect_mongo], async(req, res)=>{
  const mongo = req.mongoDB;
  
  // searching for puntos-turisticos collection in DB. If it does not exist it
  // is going to be created.
  const punto_turistico_collection = mongo.collection('puntos-turisticos');

  try {
    const target_id = req.params.id;

    // List of puntos turisticos
    const punto = await punto_turistico_collection.findOne({_id: ObjectID(target_id)});

    return res.json({
      message: "Datos cargados correctamente",
      punto
    });
  }catch(e) {
    console.error(e);
    return res.status(500).json({
      message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
      error: e.message
    });
  }

});


/**
 *
 *
 *
 */
app.get('/punto-turistico/maravillas', [connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for puntos-turisticos collection in DB. If it does not exist it
  // is going to be created.
  const punto_turistico_collection = mongo.collection('puntos-turisticos');

  // list of fields to show
  const projection = {
    _id: 1,
    name: 1,
    address: 1,
    slug: 1,
    main_image: 1
  }

  try {
    // List of puntos turisticos
    const puntos_list = await punto_turistico_collection.find({is_maravilla: true}).project(projection).toArray();

    return res.json({
      message: "Datos cargados correctamente",
      puntos: puntos_list
    });
  }catch(e) {
    return res.status(500).json({
      message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
      error: e
    });
  }
});

/**
 *
 * Fetchs all the data of a specific location according to its slug
 */
app.get('/punto-turistico/:slug', [connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for puntos-turisticos collection in DB. If it does not exist it
  // is going to be created.
  const punto_turistico_collection = mongo.collection('puntos-turisticos');

  try {
    // List of puntos turisticos
    const puntos_list = await punto_turistico_collection.find({slug: req.params.slug}).toArray();

    // 
    if(puntos_list.length === 0) {
      return res.status(404).json({
	message: "Punto turístico no encontrado"
      });
    }

    return res.json({
      message: "Datos cargados correctamente",
      punto: puntos_list[0]
    });
  }catch(e) {
    return res.status(500).json({
      message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
      error: e
    });
  }
});

module.exports = app;
