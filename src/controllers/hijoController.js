const controller = {};

controller.listHijo = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM hijo', (err, hijo) => {
     if (err) {
      res.json(err);
     }
     res.render('hijo', {
        data: hijo
     });
    });
  });
};

controller.saveHijo = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    if (data.hijode.length == 0) {
      conn.query(`INSERT INTO hijo set id=${data.id},nom='${data.nom}',hijode=NULL`, (err, hijo) => {
        if (err) {
          res.redirect('/hijos')
        } else {
          res.redirect('/hijos')
        }
      });
    } else {
      conn.query(`INSERT INTO hijo set id=${data.id},nom='${data.nom}',hijode=${data.hijode}`, (err, hijo) => {
        if (err) {
          res.redirect('/hijos')
        } else {
          res.redirect('/hijos')
        }
      });
    }

  })
};

controller.editHijo = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM hijo WHERE id = ?", [id], (err, rows) => {
      res.render('hijo_edit', {
        data: rows[0]
      })
    });
  });
};

controller.updateHijo = (req, res) => {
  const { id } = req.params;
  const newHijo = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE hijo set ? where id = ?', [newHijo, id], (err, rows) => {
    res.redirect('/hijos');
  });
  });
};

controller.deleteHijo = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM hijo WHERE id = ?', [id], (err, rows) => {
      res.redirect('/hijos');
    });
  });
};

controller.listHijoSinPadre = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM hijo WHERE hijode IS NULL', (err, hijo) => {
     if (err) {
      res.json(err);
     }
     res.render('hijoSinP', {
        data: hijo
     });
    });
  });
};

controller.listHijoPadre = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM hijo WHERE hijode = ?", [id], (err, rows) => {
      res.render('verhijos', {
        data: rows
      })
    });
  });
};

module.exports = controller;
