var fb  = require("firebird");
var db = require("../config");

const controller = {};

//Se listan los hijos
controller.listHijo = (req, res) => {
  var conn = fb.createConnection();
  conn.connect(db.database, db.user,db.password, db.role, function(err){
    conn.query('SELECT * FROM hijo', (err, hijo) => {
      if (err) {
        res.json(err);
      }
      var data = hijo.fetchSync('all',true);
      res.render('hijo', {
        data:  data
      });
    });
  });
};

// Se guarda el hijo
controller.saveHijo = (req, res) => {
    const data = req.body;
    
      var conn = fb.createConnection();
      conn.connect(db.database, db.user,db.password, db.role, function(err){
        if (data.hijode.length == 0) {
          conn.querySync(`INSERT INTO hijo (ID,NOM) values (${data.id}, '${data.nom}')`);
          conn.commitSync();
          res.redirect('/hijos');
        } else {
          conn.querySync(`INSERT INTO hijo (ID,NOM,HIJODE) values (${data.id}, '${data.nom}', ${data.hijode})`);
          conn.commitSync();
          res.redirect('/hijos');
        }
      });
};

// Se carga el formulario para editar el hijo con los datos del hijo seleccionado
controller.editHijo = (req, res) => {
  const {id} = req.params;
  
  var conn = fb.createConnection();
  conn.connect(db.database, db.user,db.password, db.role, function(err){
    conn.query(`SELECT * FROM hijo WHERE ID=${id}`, (err, hijo) => {
      if (err) {
        res.json(err);
      }
      var data = hijo.fetchSync('all',true);
      res.render('hijo_edit', {
        data:  data[0]
      });
    });
  });
};

//Se actualiza el Hijo
controller.updateHijo = (req, res) => {
  const {id} = req.params;
  const newHijo = req.body;
  var conn = fb.createConnection();
    conn.connect(db.database, db.user,db.password, db.role,function(err){
        conn.querySync(`UPDATE hijo SET ID=${newHijo.id},NOM='${newHijo.nom}',HIJODE=${newHijo.hijode} WHERE ID=${id}`);
        conn.commitSync();
        res.redirect('/hijos');
    });
};

//Se borra el Hijo
controller.deleteHijo = (req, res) => {
  const {id} = req.params;
  var conn = fb.createConnection();
    conn.connect(db.database, db.user,db.password, db.role, function(err){
        conn.querySync(`DELETE FROM hijo WHERE ID=${id}`);
        conn.commitSync();
        res.redirect('/hijos');
    });
};
module.exports = controller;
