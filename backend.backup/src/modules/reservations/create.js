const db_connection = require('../middleware/dbconection');
const session_validator = require('../middleware/jwt');
const Reservation = require('./model/Reservation');

const app = require('express')();

app.post('/reservation/', [db_connection, session_validator], async(req, res)=>{

	const body = {
		...req.body,
		user: req.user
	};

  try {
    const reservation_model = new Reservation(body);
    const insert_reservation = await reservation_model.save(body.user.__id);

    return res.json({
      message: "Datos guardados correctamente",
      output: insert_reservation
    });
  }catch(e) {
    return res.status(400).json({
      message: "Hubo un problema guardando",
      error: e.message
    });
  }
});

module.exports = app;
