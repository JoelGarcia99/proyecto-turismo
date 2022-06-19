const admin_validator = require("../middleware/admin_validator");
const db_connection = require("../middleware/dbconection");
const { v4: uuidv4 } = require('uuid');

const app = require("express")();
app.post('/guia/register', [db_connection, admin_validator], (req, res) => {
    const body = req.body;
    req.body.__id = uuidv4();
    req.body.id_admin = req.user.__id;
    req.conn.query(
        'insert into guia set ?',
        [body],
        (error, output) => {
            if (error) {
                res.status(400).json({
                    message: "No se pudo registar el Guia "+ (error.code ==="ER_DUP_ENTRY"? "este ya existe":""),
                    error
                });
                return;
            }
            delete body.password;
            res.json({
                message: "Guia registrado exitosamente",
                user: body
            });
        }
    )

});

module.exports = app;