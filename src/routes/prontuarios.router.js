const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

const prontuarioController = require('../controllers/prontuarios.controller');

router.get('/api/prontuario', checkAuth, prontuarioController.prontuarioGet);
router.get('/api/prontuario/:id', checkAuth, prontuarioController.prontuarioGetId);
router.post('/api/prontuario', checkAuth, prontuarioController.prontuarioPost);
router.patch('/api/prontuario/:id', checkAuth, prontuarioController.prontuarioPatchId);
router.delete('/api/prontuario/:id', checkAuth, prontuarioController.prontuarioDeleteId);

module.exports = router;