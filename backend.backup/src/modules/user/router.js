const app= require("express")();

app.use(require("./user.auth"));
app.use(require("./user.guia"));

module.exports = app;
