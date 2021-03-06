var express = require('express'),
	app		= express(),
	path = require('path'),
	server	= require('http').createServer(app),
	stage	= require('./config/local')('local'),
	fileUpload = require('express-fileupload'),
	bodyParser = require('body-parser'),
	routes 	= require('./config/routes')(express.Router());

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.set('x-powered-by', 'Austin4Silvers');
// app.disable('x-powered-by');
_root = __dirname;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(fileUpload());
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'assets')))
app.use('/asset', express.static(path.join(__dirname, 'uploads')));

server.listen(stage.port, function(){
	console.log('\n'+'\x1b[33m%s\x1b[0m ', ' ENV: ', "\x1b[36m", stage.mode +"\n","\x1b[31m");
	console.log( '\x1b[33m%s\x1b[0m: ', '\n Image-upload listening on port' ,"\x1b[36m", stage.port);
    console.log("\n","\x1b[31m", "\n Press \'<Ctrl> + c\' to exit \n", "\x1b[35m");
});
