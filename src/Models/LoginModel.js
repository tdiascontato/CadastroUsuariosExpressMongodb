const mongoose = require('mongoose');
const validator = require('validator');
const LoginSchema = new mongoose.Schema({// Esquema ou modelagem
    email: {type: String, required: true},
    password: {type: String, required: true},
});
const LoginModel = mongoose.model('Login', LoginSchema);
class Login{
    constructor(body){
        this.body = body;
        this.errors = [];//armazenar os erros
        this.user = null;//usuarios comecam vazios
    }
    async register(){
        this.valida();
        if(this.errors.length > 0) return;
        try{
            this.user = await LoginModel.create(this.body);
        } catch(e){
            console.log(e);
        }
    }
    valida(){
        //validar email e senha
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.errors.push('Opa! Email inválido!');
        if(this.body.password.length < 6 || this.body.length > 20) this.errors.push('Opa! 6 <= caracteres da senha <= 20');
    }
    cleanUp(){
        for(const key in this.body){//acessando as partes do body
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}
module.exports = Login;