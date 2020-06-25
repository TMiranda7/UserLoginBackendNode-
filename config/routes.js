const consign = require("consign/lib/consign")

module.exports = app =>{
    app.post( "/signin", app.api.auth.signin)
    app.post( "/signup", app.api.user.save)
    app.post( "/validaToken", app.api.auth.validaToken)

    app.route("/users")
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route("/users/:id")
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
}