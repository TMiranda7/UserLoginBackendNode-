const app = require("express")()
const consign = require("consign")
const db = require("./config/db")

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middleware.js')
    .then("./api/validation.js")
    .then("./api")
    .then("./config/routes.js")
    .into(app)

app.listen(3012 , () =>{
    console.log("Projeto Totvs iniciado com sucesso de novo");
})

