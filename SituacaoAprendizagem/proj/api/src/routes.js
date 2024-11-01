const express = require('express');

const router = express.Router();

const Professores = require('./controllers/professores');
const Turmas = require('./controllers/turmas');
const Atividades = require('./controllers/atividades');

router.post('/professores', Professores.create);
router.get('/professores', Professores.read);
router.get('/professores/:id', Professores.read);
router.put('/professores', Professores.update);
router.delete('/clientes/:id', Professores.del);

router.post('/turmas', Turmas.create);
router.get('/turmas', Turmas.read);
router.get('/turmas/:id', Turmas.read);
router.put('/turmas', Turmas.update);
router.delete('/turmas/:id', Turmas.del);

router.post('/atividades', Atividades.create);
router.get('/atividades', Atividades.read);
router.get('/atividades/:id', Atividades.read);
router.put('/atividades', Atividades.update);
router.delete('/atividades/:id', Atividades.del);

router.get('/', (req, res) => { return res.json("API respondendo") });

module.exports = router;