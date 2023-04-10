const Login = require('../Models/LoginModel')
exports.index = (req, res) => {
    res.render('login')
};
exports.register = async function (req, res){
//Estou implementando o que o usuario escreveu para tratar isso
    try{
        const login = new Login(req.body);
        await login.register();
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('back');
            });
            return;
        }
    
    req.flash('success', 'Usuário criado com sucesso!');
    req.session.save(function() {
        return res.redirect('back');
    });
    } catch(e){
        console.log(e);
        return res.render('404');
    }
};