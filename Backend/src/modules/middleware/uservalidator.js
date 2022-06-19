const validator = require('validator');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const app = require('../user/user.auth');
const db_connection = require('./dbconection');

const valida_campos = (req, res, next) => {
    req.body.__id = uuidv4();
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
        res.status(400).json({
            message: "email invalido"
        });
        return;
    }
    if (!validator.isStrongPassword(password)) {
        res.status(400).json({
            message: "password invalido: La contraseña debe tener mayusculas, numeros y caracteres especiales"
        });
        return;
    }

    const saltRounds = 7;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.error(err)
            res.status(500).json({
                message: "Error de servidor intente nuevamente"
            });
            return;
        }
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                console.error(err)
                res.status(500).json({
                    message: "Error de servidor intente nuevamente"
                });
                return;
            }
            req.body.password = hash;
            next();
        });
        
    });
}





module.exports = valida_campos;
