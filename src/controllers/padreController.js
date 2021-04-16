var db = require("../config");
var fb  = require("firebird");

const controller = {};

//Se listan los padres
controller.listPadre = (req, res) => {
    var conn = fb.createConnection();
    conn.connect(db.database, db.user,db.password, db.role, function(err){
      conn.query('SELECT * FROM padre', (err, padre) => {
        if (err) {
          res.json(err);
        }
        var data = padre.fetchSync('all',true);
        res.render('padre', {
          data:  data
        });
      });
    });
  };

  // Se guarda el padre
controller.savePadre = (req, res) => {
    const data = req.body;
      var conn = fb.createConnection();
      conn.connect(db.database, db.user,db.password, db.role, function(err){
          conn.querySync(`INSERT INTO padre (ID,NOM) values (${data.id}, '${data.nom}')`);
          conn.commitSync();
          res.redirect('/padres');
      });
};

// Se carga el formulario para editar el padre con los datos del padre seleccionado
controller.editPadre = (req, res) => {
    const {id} = req.params;
    
    var conn = fb.createConnection();
    conn.connect(db.database, db.user,db.password, db.role, function(err){
      conn.query(`SELECT * FROM padre WHERE ID=${id}`, (err, hijo) => {
        if (err) {
          res.json(err);
        }
        var data = hijo.fetchSync('all',true);
        res.render('padre_edit', {
          data:  data[0]
        });
      });
    });
};

// Se actualiza el padre
controller.updatePadre = (req, res) => {
    const {id} = req.params;
    const newPadre = req.body;
    var conn = fb.createConnection();
      conn.connect(db.database, db.user,db.password, db.role, function(err){
          conn.querySync(`UPDATE padre SET ID=${newPadre.id},NOM='${newPadre.nom}' WHERE ID=${id}`);
          conn.commitSync();
          res.redirect('/padres');
      });
};

//Se borra el Padre
controller.deletePadre = (req, res) => {
    const {id} = req.params;
    var conn = fb.createConnection();
      conn.connect(db.database, db.user,db.password, db.role, function(err){
          conn.querySync(`DELETE FROM padre WHERE ID=${id}`);
          conn.commitSync();
          res.redirect('/padres');
      });
  };
module.exports = controller;
