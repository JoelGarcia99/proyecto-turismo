const app = require('express')();

app.use(require('./create'));
app.use(require('./read'));

module.exports = app;
