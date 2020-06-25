const bcrypt = require('bcrypt-nodejs')
                            
module.exports = app =>{
    const { existsOrErro, notExistsOrErro, equalsOrErro } = app.api.validation

    const PassEncrypt = (password) => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password ,salt)
    }


    const save = async (req , res) =>{
        const user = {...req.body}
        if(req.params.id)
            user.id = req.params.id
        try{
            existsOrErro(user.name,"nome não informado")
            existsOrErro(user.email,"E-mail não informado")
            existsOrErro(user.password,"password não informado")
            existsOrErro(user.ConfirmPassword,"confirm pass não informado")
            existsOrErro(user.profile,"perfil não informado")
            equalsOrErro(user.password,user.ConfirmPassword,"as senhas não conferem")
                
            const connected = await app.db('users').where({email: user.email }).first()
            
            if(!user.id)
                notExistsOrErro(connected ,"já cadastrado !")                

        }catch(msg){
            res.status(400).send(msg)
        }

        user.password = PassEncrypt(user.password)
        delete user.ConfirmPassword

        if(user.id){
            // res.send("atualziar")
            app.db('users')
               .update(user)
               .where({id:user.id})
               .then( _=> res.status(204).send())
               .catch((error) => res.status(500).send(error))
        }
        else{
            app.db('users')
            .insert(user)
            .then( _=> res.status(204).send())
            .catch( err => res.status(500).send(err))
        }
    }

    const get = ( req , res) =>{
        app.db('users')
        .select('id','name','email','profile')
        .then( user => res.json(user))
        .catch( err => res.stats(500).send(err) )
    }

    const getById = ( req, res) => {
        app.db("users")
        .select('id','name','email','profile')
        .where({id : req.params.id }).first()
        .then( _ => res.json({user}))
        .catch( err => res.status(400).send(err))
    }
 
    return { save, get, getById }
}