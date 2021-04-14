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

// // middlewares
// app.use(morgan('dev'));
// app.use(myConnection(firebird, {
// 	host: 'localhost',
// 	user: 'SYSDBA',
// 	password: 'root',
// 	port: 3050,
// 	database: 'BIENESTAR2'
// }, 'single'));
// app.use(express.urlencoded({ extended: true }));

var options = {};
 
options.host = '127.0.0.1';
options.port = 3050;
options.database = 'database.fdb';
options.user = 'SYSDBA';
options.password = 'root';
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null;            // default
options.pageSize = 4096;        // default when creating database

//routes
app.use('/', customerRoutes);


// static files
app.use(express.static('public'));

// starting the server
app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});
