const { Router } = require('express');
const express = require('express');
var fb  = require("firebird");
var db = require("../config");
const router = express.Router();

const hijoController = require('../controllers/hijoController');
const padreController = require('../controllers/padreController');

//Se pide la conexión con la base de datos y se muestra el main
router.get('/',function(req,res){
	var conn = fb.createConnection();
	conn.connect(db,'SYSDBA','root','',function(err){
		var r = {
			err: err?err.message:null,
			connected: conn.connected  
		};
		res.render('inicio')
	})
	
	conn.on('error',function(){res.send('<h1>Conexión invalida</h1>')});
});

//Rutas Hijos
router.get('/hijos', hijoController.listHijo);
router.post('/addhijo', hijoController.saveHijo);
router.get('/updatehijo/:id', hijoController.editHijo);
router.post('/updatehijo/:id', hijoController.updateHijo);
router.get('/deletehijo/:id', hijoController.deleteHijo);


//Rutas Padres
router.get('/padres', padreController.listPadre);
router.post('/addpadre', padreController.savePadre);
router.get('/updatepadre/:id', padreController.editPadre);
router.post('/updatepadre/:id', padreController.updatePadre);
router.get('/deletepadre/:id', padreController.deletePadre);


module.exports = router;

