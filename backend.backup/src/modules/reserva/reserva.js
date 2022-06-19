const req = require("express/lib/request");
const db_connection = require("../middleware/dbconection");
const session_validator = require("../middleware/jwt");
const { v4: uuidv4 } = require('uuid');
const admin_validator = require("../middleware/admin_validator");

const app = require("express")();
app.post("/reserva", [db_connection, session_validator], (req, res) => {
    req.body.id_reserva = uuidv4();
    req.body.id_aprueba = uuidv4();
    req.body.id_usuario = req.user.__id;
    const {
        id_usuario, id_puntoturistico, aforo, comentario, id_reserva, id_aprueba, id_reserva_puntoturis
    } = req.body;
    req.conn.query(
        "call registro_reserva(?,?,?,?,?,?,?)",
        [id_usuario, id_puntoturistico, aforo, comentario, id_reserva, id_aprueba, id_reserva_puntoturis],
        (error, output) => {
            if (error) {
                res.status(500).json({
                    message: "No se pudo agendar, Intente mas tarde",
                    error
                });
                return;
            }
            res.json({
                message: "Reserva generada correctamente",
                output
            });
        });

});
app.get("/reservas/admin", [db_connection, admin_validator], (req, res) => {
    req.conn.query(
        "select fecha,estado,u.cedula_pas,u.nombre,aforo,r.comentario,hora_inicio," +
        "horario_fin,g.nombre,r.__id as id_reserva,u.__id as id_usuario, rp.__id as id_reserva_puntoturistico," +
        "a.__id as id_aprueba_reserva from reserva as r join aprueba_reserva as a on (r.__id = a.id_reserva) " +
        "join usuario as u on (r.id_usuario = u.__id) join reserva_puntoturis as rp on (r.id_reserva_puntoturis = rp.__id) " +
        "join guia g on(g.__id = rp.id_guia)  where leido_admin = 0 and (a.id_admin = ? or a.id_admin is null) ",
        [req.user__id],
        (error, output) => {
            if (error) {
                res.status(500).json({
                    message: "No se pudo obtener reservas, Intente mas tarde",
                    error
                });
                return;
            }
            res.json({
                message: "Mostrando reservas correctamente",
                output
            });
        });

});


module.exports = app;
