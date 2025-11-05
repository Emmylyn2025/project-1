const express = require('express');
const { registerUser, loginUser, homeController, adminController, uploadProductController, changePassword} = require('../controllers/controller');
const {homeMiddleware, adminMiddleware} = require('../middleware/middleware');
const uploadMiddleware = require('../multer-middleware/multer');

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/change-password', homeMiddleware, changePassword)
router.get('/home', homeMiddleware, homeController);
router.get('/admin', homeMiddleware, adminMiddleware, adminController);
router.post('/product', homeMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadProductController)

module.exports = router;