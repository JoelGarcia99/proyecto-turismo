const jwt = require('jsonwebtoken');

const session_validator = (req, res, next) =>{
    console.log(req.headers);
    jwt.verify(req.headers.auth, process.env.JWT_KEY, (err, decoded)=> {
        if(err){
            console.error(err);
            res.status(400).json({
                message: "Sesión no valida"
            });
            return;
        }
        req.user = decoded;
        next();
      });
}

module.exports = session_validator;