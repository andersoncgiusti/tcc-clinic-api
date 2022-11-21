const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

const totalController = require('../controllers/total.controller');

router.get('/api/total', checkAuth, totalController.totalGet);
router.put('/api/total', checkAuth, totalController.totalPost);
router.put('/api/totals', checkAuth, totalController.totalPut);
// router.put('/api/totals' , totalController.totalForPut);

module.exports = router;