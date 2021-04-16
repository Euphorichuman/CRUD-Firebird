const { Router } = require('express');
const express = require('express');
var fb  = require("firebird");
var db = require("../config");
const router = express.Router();

const hijoController = require('../controllers/hijoController');
const padreController = require('../controllers/padreController');

//Se pide la conexión con la base de datos y se muestra el inicio de la aplicación
router.get('/',function(req,res){
	var conn = fb.createConnection();
	conn.connect(db.database, db.user, db.password, db.role, function(err){
		var r = {
			err: err?err.message:null,
			connected: conn.connected  
		};
		res.render('inicio', {
			data: true
		})
	})
	
	conn.on('error',function(){res.render('inicio', {
		data: false
	})});
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

