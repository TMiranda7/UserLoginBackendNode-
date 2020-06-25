module.exports = app =>{
    function existsOrErro(value , msg){
        if(!value) throw msg
        if( Array.isArray(value) && value.length === 0 ) throw msg
        if(typeof value == 'string' && !value.trim()) throw msg
    }

    function notExistsOrErro(value, msg){
        try{
            existsOrErro(value, msg)
        }catch(msg){
            return
        }
        throw msg
    }

    function equalsOrErro(valua,valub,msg){
        if(valua !== valub) throw msg
    }

    return { existsOrErro , notExistsOrErro , equalsOrErro }
}