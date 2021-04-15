var fb  = require("firebird");
const { lastIndexOf } = require("../config");
var db = require("../config");

const controller = {};

//Se listan los padres sin hijos
controller.listPadreSinH = (req, res) => {
    var conn = fb.createConnection();
    conn.connect(db,'SYSDBA','root','',function(err){
      conn.query('SELECT * FROM padre P WHERE NOT EXISTS (SELECT NULL FROM hijo H WHERE H.HIJODE=P.ID)', (err, hijo) => {
        if (err) {
          res.json(err);
        }
        var data = hijo.fetchSync('all',true);
        res.render('padreSinhijo', {
          data:  data
        });
      });
    });
  };

  //Se listan los padres sin hijos no terminado
controller.listPadreNumH = (req, res) => {
    var conn = fb.createConnection();
    conn.connect(db,'SYSDBA','root','',function(err){
        var padre = conn.querySync(`SELECT * FROM padre`);
        var data = padre.fetchSync('all',true);
        conn.commitSync();
            for (let i = 0; i < data.length; i++) {
                var hijos = conn.querySync(`SELECT COUNT(*) FROM hijo WHERE HIJODE=${data[i].ID}`);
                var data2 = hijos.fetchSync('all',true);
                conn.commitSync();
                data[i].TOTAL = data2[0].COUNT;
            }
        res.render('listPadreNumH', {
            data:  data
          });
    });
  };

  //Seleccionar padre
  controller.listPadre = (req, res) => {
    var conn = fb.createConnection();
    conn.connect(db,'SYSDBA','root','',function(err){
      conn.query('SELECT * FROM padre', (err, padre) => {
        if (err) {
          res.json(err);
        }
        var data = padre.fetchSync('all',true);
        res.render('padreConsul1', {
          data:  data
        });
      });
    });
  };

  controller.ListHijoPadre = (req, res) => {
    const {id} = req.params;
    
    var conn = fb.createConnection();
    conn.connect(db,'SYSDBA','root','',function(err){
      conn.query(`SELECT * FROM hijo WHERE HIJODE=${id}`, (err, hijo) => {
        if (err) {
          res.json(err);
        }
        var data = hijo.fetchSync('all',true);
        res.render('verhijos', {
          data:  data
        });
      });
    });
  };

  controller.ListHijoSinPadre = (req, res) => {    
    var conn = fb.createConnection();
    conn.connect(db,'SYSDBA','root','',function(err){
      conn.query(`SELECT * FROM hijo WHERE HIJODE IS NULL`, (err, hijo) => {
        if (err) {
          res.json(err);
        }
        var data = hijo.fetchSync('all',true);
        res.render('hijoSinP', {
          data:  data
        });
      });
    });
  };
module.exports = controller;
