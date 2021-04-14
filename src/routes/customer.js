const { Router } = require('express');
const express = require('express');
var fb  = require("firebird");
const router = express.Router();

//
const hijoController = require('../controllers/hijoController');
const padreController = require('../controllers/padreController');


//Se pide la conexión con la base de datos
router.get('/',function(req,res){
	var conn = fb.createConnection();
	conn.connect('../BIENESTAR2.GDB','SYSDBA','root','',function(err){
		var r = {
			err: err?err.message:null,
			connected: conn.connected  
		};
		res.render('inicio')
	})
	
	conn.on('error',function(){res.send('<h1>Conexión invalida</h1>')});
});

router.get('/hijos',function(req,res){
    var conn = fb.createConnection();
    conn.connect('../BIENESTAR2.GDB','SYSDBA','root','',function(err){
      conn.query('SELECT * FROM hijo', function(err, hijo) {
        if (err) {
          res.json(err);
        }

        var first = true;
        hijo.fetch('all',true,function(obj){
            var fields = [],fr = [];
             for(var f in obj){
              fields.push(f);
              fr.push(obj[f]);
             };

             console.log(JSON.stringify(obj))
             res.render('hijo', {
                data: obj
              });
        },
        function(err,eof){
            if(reportError(res,err)) return;
            if(first) {
              res.end('"fields":[],"data":[]}');
              return;
            }
            res.end(']}');
        });
      });
    });
});

// router.get('/hijos', hijoController.listHijo);
// router.post('/addhijo', hijoController.saveHijo);
// router.get('/updatehijo/:id', hijoController.editHijo);
// router.post('/updatehijo/:id', hijoController.updateHijo);
// router.get('/deletehijo/:id', hijoController.deleteHijo);
// router.get('/HijosSinP', hijoController.listHijoSinPadre);
// router.get('/verhijos/:id', hijoController.listHijoPadre);


// router.get('/padres', padreController.listPadre);
// router.post('/addpadre', padreController.savePadre);
// router.get('/updatepadre/:id', padreController.editPadre);
// router.post('/updatepadre/:id', padreController.updatePadre);
// router.get('/deletepadre/:id', padreController.deletePadre);
// router.get('/padresSinH', padreController.listPadreSinH);
// router.get('/PadresNumH', padreController.listPadreNumH);
// router.get('/Seleciconarpadre', padreController.listPadreConsult1);

module.exports = router;

