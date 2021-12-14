const express = require("express"); //chama o modulo express
const app = express(); //a função express cria uma cópia inteira do framework
const handlebars = require ('express-handlebars')
const bodyParser = require("body-parser")
const Post = require ('./models/Post')

//Config
	//Template Engine
		app.engine('handlebars',handlebars({defaultLayout: 'main'}))
    	app.set('view engine', 'handlebars')
	//Body Parser //passa informações do formulario
		app.use(bodyParser.urlencoded({extended : false}))
		app.use(bodyParser.json())

	

//Rotas

//ROTA HOME
	app.get('/', function(req, res){
		//chama todos os posts
		Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
		res.render('home', {posts: posts})
		})		
			
	})

//ROTA CADASTRO
	app.get('/cad', function(req, res){		
		res.render('formulario')		
	})

//ROTA QUE RECEBE OS DADOS DO FORMULARIO E ENVIA PARA O BD
	
	app.post('/add', function(req, res){		
		Post.create({
			titulo: req.body.titulo,
			conteudo: req.body.conteudo
		}).then(function(){
			res.redirect('/')
		}).catch(function(erro){
			res.send("Houve um erro: " + erro)
		})		
	})

	app.get('/del/:id', function(req,res){
		Post.destroy({where: {'id' : req.params.id}}).then(function(){
			res.send("Postagem deletada com sucesso! :)")
		}).catch(function(erro){
			res.send("Essa postagem não existe :(")
		})
	})


	app.listen(8081, function(){
	console.log("Servidor rodando na url http://localhost:8081");
	}); //essa função tem que sera a ultima do código


 












/*
app.get("/", function(req, res){                         //Rota 1
	res.send("Seja bem vindo ao meu app!");
});

app.get("/sobre", function(req, res){                    //Rota 2
	res.send("Minha pagina sobre");
});

app.get("/blog", function(req, res){                     //Rota 3
	res.send("Seja bem vindo ao meu blog!");
});

*/
