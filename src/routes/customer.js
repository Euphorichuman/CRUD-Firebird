const express = require('express');
const router = express.Router();

const hijoController = require('../controllers/hijoController');
const padreController = require('../controllers/padreController');


router.get('/', async (req, res) => {
    res.render('inicio');
});

router.get('/hijos', hijoController.listHijo);
router.post('/addhijo', hijoController.saveHijo);
router.get('/updatehijo/:id', hijoController.editHijo);
router.post('/updatehijo/:id', hijoController.updateHijo);
router.get('/deletehijo/:id', hijoController.deleteHijo);
router.get('/HijosSinP', hijoController.listHijoSinPadre);
router.get('/verhijos/:id', hijoController.listHijoPadre);


router.get('/padres', padreController.listPadre);
router.post('/addpadre', padreController.savePadre);
router.get('/updatepadre/:id', padreController.editPadre);
router.post('/updatepadre/:id', padreController.updatePadre);
router.get('/deletepadre/:id', padreController.deletePadre);
router.get('/padresSinH', padreController.listPadreSinH);
router.get('/PadresNumH', padreController.listPadreNumH);
router.get('/Seleciconarpadre', padreController.listPadreConsult1);

module.exports = router;

