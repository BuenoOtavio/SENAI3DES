const express = require('express');

const router = express.Router();

const Middleware = require('./middleware/middleware');
const Colaborador = require('./controllers/colaborador');
const Os = require('./controllers/os');
const Comentario = require('./controllers/comentario');

router.post('/login', Colaborador.login);
router.post('/colaborador', Colaborador.create);
router.get('/colaborador', Middleware.validaAcesso, Colaborador.read);
router.get('/colaborador/:matricula', Middleware.validaAcesso, Colaborador.read);
router.put('/colaborador', Middleware.validaAcesso, Colaborador.update);
router.delete('/colaborador/:matricula', Middleware.validaAcesso, Colaborador.del);

router.post('/comentario', Comentario.create);
router.get('/comentario', Comentario.read);
router.get('/comentario/:id', Comentario.read);
router.put('/comentario', Comentario.update);
router.delete('/comentario/:id', Comentario.del);

router.post('/os', Os.create);
router.get('/os', Os.read);
router.get('/os/:id', Os.read);
router.put('/os', Os.update);
router.delete('/os/:id', Os.del);

router.get('/', (req, res) => { return res.json("API OSs respondendo") });

module.exports = router;