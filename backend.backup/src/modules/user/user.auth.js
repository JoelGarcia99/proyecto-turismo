require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db_connection = require('../middleware/dbconection');
const valida_campos = require('../middleware/uservalidator');
const app = require('express')();

app.post('/user/register', [db_connection, valida_campos], (req, res) => {
    const body = req.body;
    req.conn.query(
        "call registra_admin(?,?,?,?,?,?,?,?,?) ",
        [body.__id,body.nombre,body.apellido,body.email, body.password, body.cedula_pas,body.role, body.telefono, body.token],
        (error, output) => {
            if (error) {
                res.status(400).json({
                    message: "No se pudo registar el usuario",
                    error
                });
                return;
            }
            delete body.password;
            res.json({
                message: "Usuario registrado exitosamente",
                user: body
            });
        }
    )

});

app.post("/user/login", [db_connection], (req, res) => {
    const { email, password } = req.body;
    req.conn.query(
        "select * from usuario where email = ?",
        [email],
        (error, output) => {
            if (error || output.length === 0) {
                res.status(400).json({
                    message: "Usuario o contraseña incorrecta"
                });
                return;
            }
            bcrypt.compare(password, output[0].password, (err, result) => {
                if (err || !result) {
                    console.error(err);
                    res.status(400).json({
                        message: "Usuario o contraseña incorrecta"
                    });
                    return;
                }
                const user = output[0];
                delete user.password;
                jwt.sign(user, process.env.JWT_KEY, (error, token) => {
                    if (error) {
                        console.error(error);
                        res.status(400).json({
                            message: "No se pudo iniciar Sesión, inicia mas tarde"
                        });
                        return;
                    }
                    res.json({
                        message: "Sesión Iniciada correctamente Felicidades",
                        token, user
                    });
                });                                
            });
        }
    )
});


module.exports = app;
