const connect_mongo = require('../middleware/mongoconnection');
const ObjectID = require('mongodb').ObjectID;   
const app = require('express')();

app.get('/categories/', [connect_mongo], async(req, res)=>{

  const mongo = req.mongoDB;
  
  // searching for categories collection in DB. If it does not exist it
  // is going to be created.
  const category_collection = mongo.collection('categories');

  try {
    // List of categories 
    const category_list = await category_collection.find({}).toArray();

    return res.json({
      message: "Datos cargados correctamente",
      categories: category_list
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
 * Fetchs all the data of a specific category according to its slug
 */
app.get('/category/:id', [connect_mongo], async(req, res)=>{

  const target_id = req.params.id;
  const mongo = req.mongoDB;
  
  // searching for categories-turisticos collection in DB. If it does not exist it
  // is going to be created.
  const category_collection = mongo.collection('categories');

  try {
    // List of categories turisticos
    const category = await category_collection.findOne({_id: ObjectID(target_id)});

    if(!category) {
      return res.status(404).json({
	message: "No se puedo obtener el guía",
	error: "Categoría no encontrada"
      });
    }

    return res.json({
      message: "Datos cargados correctamente",
      category
    });
  }catch(e) {
    return res.status(500).json({
      message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
      error: e.message
    });
  }
});

module.exports = app;
