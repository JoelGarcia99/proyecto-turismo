const jwt = require('jsonwebtoken');

const admin_validator = (req, res, next) =>{
    console.log(req.headers);
    jwt.verify(req.headers.auth, process.env.JWT_KEY, (err, decoded)=> {
        if(err){
            console.error(err);
            res.status(400).json({
                message: "Sesión no valida"
            });
            return;
        }
        if(decoded.role!== "admin"){
            res.status(403).json({
                message: "Usuario no autorizado"
            });
            return;
        }
        req.user = decoded;
        next();
      });
}

module.exports = admin_validator;