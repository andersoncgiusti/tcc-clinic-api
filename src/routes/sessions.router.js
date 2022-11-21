const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

const sessionsController = require('../controllers/sessions.controller');

router.post('/api/session', checkAuth, sessionsController.sessionPost);
router.post('/api/session_post', checkAuth, sessionsController.sessionPostTotal);
router.get('/api/session', checkAuth, sessionsController.sessionGet);
router.put('/api/session_totals/:id', checkAuth, sessionsController.sessionDelete);
router.put('/api/session', checkAuth, sessionsController.sessionPut);
router.put('/api/session_total', checkAuth, sessionsController.totalPut);

module.exports = router;