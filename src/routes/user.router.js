const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

const userController = require('../controllers/user.controller');


router.get('/api/userPacient', checkAuth, userController.userGetPacient);
router.get('/api/user', checkAuth, userController.userGet);
router.get('/api/user/:id', checkAuth, userController.userGetId);
router.post('/api/user', checkAuth, userController.userPost);
router.put('/api/user/:id', checkAuth, userController.userUpdateId);
router.put('/api/userChart/:id', checkAuth, userController.chartUpdateId);
router.delete('/api/user/:id', checkAuth, userController.userDeleteId);
router.post('/api/user_password', checkAuth, userController.userPassword);
router.put('/api/user_password', checkAuth, userController.userPasswordId);
/////////////////////////////////////
router.post('/api/user_authenticate', userController.authenticate);
router.post('/api/user_reset_password', userController.reset);
router.post('/api/user_forgot_password', userController.forgot);
// router.get('/api/userCpf',checkAuth, userController.useGetCpf);
    
module.exports = router;