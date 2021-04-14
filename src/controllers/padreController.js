const controller = {};

controller.listPadre = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM padre', (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('padre', {
        data: customers
     });
    });
  });
};

controller.savePadre = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO padre set ?', data, (err, nom) => {
      console.log(nom)
      res.redirect('/padres');
    })
  })
};

controller.editPadre = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM padre WHERE id = ?", [id], (err, rows) => {
      res.render('padre_edit', {
        data: rows[0]
      })
    });
  });
};

controller.updatePadre = (req, res) => {
  const { id } = req.params;
  const newPadre = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE padre set ? where id = ?', [newPadre, id], (err, rows) => {
    res.redirect('/padres');
  });
  });
};

controller.deletePadre = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM padre WHERE id = ?', [id], (err, rows) => {
      res.redirect('/padres');
    });
  });
}

controller.listPadreSinH = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM padre P WHERE NOT EXISTS (SELECT NULL FROM hijo H WHERE H.hijode = P.id)', (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('padreSinhijo', {
        data: customers
     });
    });
  });
};


  controller.listPadreNumH = (req, res) => {
    req.getConnection((err, conn) => {
      conn.query('SELECT  padre.id,padre.nom,COUNT(*) as total FROM padre INNER JOIN hijo ON padre.id=hijo.hijode group by padre.id', (err, customers) => {
       if (err) {
        res.json(err);
       }
       console.log(customers)
       res.render('listPadreNumH', {
          data: customers
       });
      });
    });
  };

  controller.listPadreConsult1 = (req, res) => {
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM padre', (err, customers) => {
       if (err) {
        res.json(err);
       }
       res.render('padreConsul1', {
          data: customers
       });
      });
    });
  };

module.exports = controller;
