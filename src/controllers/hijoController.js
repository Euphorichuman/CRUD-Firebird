var fb  = require("firebird");

const controller = {};

//Se listan los hijos (Falta terminar)
controller.list = (req, res) => {
  var conn = fb.createConnection();
  conn.connect('../BIENESTAR.GDB','SYSDBA','root','',function(err){
    conn.query('SELECT * FROM hijo', (err, hijo) => {
      if (err) {
        res.json(err);
      }
      console.log(hijo);
      res.render('hijo', {
        data: hijo
      });
    });
  });
};

module.exports = controller;
