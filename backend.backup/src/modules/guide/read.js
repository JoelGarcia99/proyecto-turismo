const {ObjectId} = require('mongodb');
const admin_validator = require('../middleware/admin_validator');
const db_connection = require('../middleware/dbconection');
const session_validator = require('../middleware/jwt');
const connect_mongo = require('../middleware/mongoconnection');
const ObjectID = require('mongodb').ObjectID;
const app = require('express')();

// Only used for management since normal requests will only extract active guides
app.get('/manage/guides/', [db_connection, admin_validator, connect_mongo], async (req, res) => {

	const mongo = req.mongoDB;

	// searching for guides collection in DB. If it does not exist it
	// is going to be created.
	const guides_collection = mongo.collection('guides');

	try {
		// List of guides 
		const guides_list = await guides_collection.find({}).toArray();

		return res.json({
			message: "Datos cargados correctamente",
			guides: guides_list
		});
	} catch (e) {
		return res.status(500).json({
			message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
			error: e.message
		});
	}
});

// Only returns active guides
app.get('/guides/', [db_connection, session_validator, connect_mongo], async (req, res) => {

	const mongo = req.mongoDB;

	// searching for guides collection in DB. If it does not exist it
	// is going to be created.
	const guides_collection = mongo.collection('guides');

	try {
		const query = {available: true};

		// List of guides 
		const guides_list = await guides_collection.find(query).toArray();

		return res.json({
			message: "Datos cargados correctamente",
			guides: guides_list
		});
	} catch (e) {
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
app.get('/guide/:id', [connect_mongo], async (req, res) => {

	const target_id = req.params.id;
	const mongo = req.mongoDB;

	// searching for guides-turisticos collection in DB. If it does not exist it
	// is going to be created.
	const guides_collection = mongo.collection('guides');

	try {
		// List of guides turisticos
		const guide = await guides_collection.findOne({_id: ObjectID(target_id)});

		if (!guide) {
			return res.status(404).json({
				message: "No se puedo obtener el guía",
				error: "Guía no encontrado"
			});
		}

		return res.json({
			message: "Datos cargados correctamente",
			punto: guide
		});
	} catch (e) {
		return res.status(500).json({
			message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
			error: e.message
		});
	}
});

app.get('/touristic-point/guides/:tourid', [connect_mongo], async (req, res) => {
	const mongo = req.mongoDB;

	// searching for guides-turisticos collection in DB. If it does not exist it
	// is going to be created.
	const guides_collection = mongo.collection('guides');

	try {

		// Filtering active guides by touristic points
		const pipeline = [
			{
				$lookup: {
					from: "puntos-turisticos",
					let: {guideId: "$_id"},
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: ["$_id", ObjectId(req.params.tourid)]
								},
							}
						},
						{
							$match: {
								$expr: {
									$in: ["$$guideId", "$guides"]
								}
							}
						},
						{
							$project: {
								_id: 1,
								name: 1
							}
						}
					],
					as: "touristic_point"
				},
			},
			{
				$unwind: { // performing inner join operation
					path: "$touristic_point",
					preserveNullAndEmptyArrays: false
				}
			},
		];

		// List of guides turisticos
		const guides = await guides_collection.aggregate(pipeline).toArray();

		if (!guides) {
			return res.status(404).json({
				message: "No se puedo obtener el guía",
				error: "Punto turistico no encontrado"
			});
		}

		return res.json({
			message: "Datos cargados correctamente",
			guides
		});
	} catch (e) {
		return res.status(500).json({
			message: "Hubo un problema de nuestro lado, contacte al equipo de TI",
			error: e.message
		});
	}
});

module.exports = app;
