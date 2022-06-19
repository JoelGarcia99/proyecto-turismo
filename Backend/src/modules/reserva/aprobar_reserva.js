const admin_validator = require("../middleware/admin_validator");
const db_connection = require("../middleware/dbconection");
const session_validator = require("../middleware/jwt");

const app = require("express")();
    app.put("/reserva/validacion",[db_connection, admin_validator], (req, resp)=>{
        
    });


module.exports = app;