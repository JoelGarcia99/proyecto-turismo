require('dotenv').config()
const bodyParser = require('body-parser')
const app = require('express')();
const cors = require('cors')
const fileUpload = require('express-fileupload');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(require("./modules/user/router"));
app.use(require("./modules/reserva/router"));
app.use(require('./modules/category/router'));
app.use(require('./modules/puntos-turisticos/router'));
app.use(require('./modules/guide/router'));
app.use(require('./modules/category/router'));
app.use(require('./modules/reservations/router'));


app.listen(`${process.env.API_PORT}`, (error)=>{
    if(error) {
        throw new Error(error);
    }

    console.log(`server online on ${process.env.API_HOST}:${process.env.API_PORT}` )
});

