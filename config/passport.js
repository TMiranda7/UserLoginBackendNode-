const { authSecret } = require('../.env')
const passport = require('passport')
const passJwt = require('passport-jwt')

const { Strategy, ExtractJwt} = passJwt

module.exports = app =>{
    const parametro = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const estrategia = new Strategy( parametro , ( payload, done) =>{
        app.db('user').where({id: payload.id})
            .then(user => done(null , user? {...payload}:false))
            .catch(err => done( err , false))
    })

    passport.use(estrategia)

    return {
        authenticate: () => passport.authenticate('jwt',{session : false})
    }
}