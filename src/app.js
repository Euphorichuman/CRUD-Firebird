const express = require('express');
path = require('path');
morgan = require('morgan');
var fb  = require("firebird");


const app = express();

// settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()) ;

// Importing routes
app.use(require('./routes/customer'));
app.use('/Consultas', require('./routes/consultas'));

// static files
app.use(express.static('public'));

// starting the server
app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});
