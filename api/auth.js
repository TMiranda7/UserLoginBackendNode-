const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const { authSecret } = require('../.env')

module.exports = app => {
    const signin = async( req, res) =>{
        if(!req.body.email || !req.body.password){
            res.status(402).send("Informe os Campos!")
        }

        const user = await app.db('users').where({email: req.body.email}).first()

        if(!user) 
            res.status(401).send("Usuario não encontrado !")

        const comparer = bcrypt.compareSync(req.body.password,user.password)

        if(!comparer) 
            res.status(402).send("Senha inválida")

        const now = Date.now()

        const payload={
            id: user.id,
            email: user.email,
            profile: user.profile,
            iat: now ,
            exp: now + (60 *60 * 24 * 1)
        }

        res.json({
            ...payload,
            token:jwt.encode( payload, authSecret)
        })
    }

    const validaToken = async( req,res ) =>{
        const user = req.body || null
        try {
            if(user){
                const token = jwt.decode(user.token ,authSecret)
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true)
                }
            }
        }catch(e){

        }
    }

    return { signin , validaToken }
}