const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentication.middleware');

const ObjetsController = require('../controllers/objets.controller');

// import controller for index
const userController = require('../controllers/user.controller');

router.get('/', userController.home );
router.get('/me', authMiddleware.validToken, userController.me );
router.put('/me', authMiddleware.validToken, userController.update );

router.post('/create', authMiddleware.validToken, ObjetsController.create );
router.get('/update',  authMiddleware.validToken,ObjetsController.update );
router.get('/userobjet',  authMiddleware.validToken,ObjetsController.userobjet );
router.get('/money', authMiddleware.validToken, userController.getmoney );
router.get('/money', authMiddleware.validToken, userController.getmoney );
router.delete( '/:objetId', ObjetsController.deleteObjet );
router.put('/losemoney', authMiddleware.validToken, userController.losemoney );
router.put('/winmoney/:sellerid', authMiddleware.validToken, userController.winmoney );

module.exports = router;
