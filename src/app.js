const express = require('express');
path = require('path');
morgan = require('morgan');
firebird = require('node-firebird');
myConnection = require('express-myconnection');

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');


// settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(firebird, {
	host: 'localhost',
	user: 'SYSDBA',
	password: 'root',
	port: 3050,
	database: 'BIENESTAR2'
}, 'single'));
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static('public'));

// starting the server
app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});
