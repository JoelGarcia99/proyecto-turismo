const app = require('express')();

app.use(require('./create'));
app.use(require('./read'));
app.use(require('./edit'));
app.use(require('./delete'));

module.exports = app;
