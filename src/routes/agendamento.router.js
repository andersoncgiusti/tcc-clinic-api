const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

const agendamentoController = require('../controllers/agendamento.controller');

router.get('/api/agendamento', checkAuth, agendamentoController.agendamentoGet);
router.get('/api/agendamento/:id', checkAuth, agendamentoController.agendamentoGetId);
router.post('/api/agendamento', checkAuth, agendamentoController.agendamentoPost);
router.put('/api/agendamento/:id', checkAuth, agendamentoController.agendamentoUpdateId);
router.put('/api/agendamento_finish/:id', checkAuth, agendamentoController.agendamentoUpdateIdFinish);
router.delete('/api/agendamento/:id', checkAuth, agendamentoController.agendamentoDeleteId);

module.exports = router;