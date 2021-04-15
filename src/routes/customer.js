const { Router } = require('express');
const express = require('express');
var fb  = require("firebird");
const router = express.Router();
function reportError(res,err)
{
    if(err){
        res.end(JSON.stringify({err: err.message}));
        return true;
    }
    return false;
}
//
const hijoController = require('../controllers/hijoController');
const padreController = require('../controllers/padreController');


//Se pide la conexión con la base de datos
router.get('/',function(req,res){
	var conn = fb.createConnection();
	conn.connect('./BIENESTAR2.GDB','SYSDBA','root','',function(err){
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
    conn.connect('./BIENESTAR2.GDB','SYSDBA','root','',function(err){
      conn.query('SELECT * FROM hijo', (err, hijo) => {
        if (err) {
          res.json(err);
        }
        var data = hijo.fetchSync('all',true);
        console.log(data);
        res.render('hijo', {
          data:  data
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

