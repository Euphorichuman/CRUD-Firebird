var options = {};

//Se configura la conexión con la base de datos
options.host = '127.0.0.1';
options.port = 3050;
options.database = 'bienestar2';
options.user = 'SYSDBA';
options.password = 'root';
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null;            // default
options.pageSize = 4096;        // default when creating database

module.exports = options;