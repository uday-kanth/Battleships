var express = require('express');
var router = express.Router();
const verifyToken=require('../middleware/authMiddleware');
const indexController=require('../controllers/indexController');
const { verify } = require('jsonwebtoken');






router.get('/singleplayer',verifyToken,indexController.getSinglePlayerPage);



router.get('/multiplayer/room',verifyToken,indexController.getMultiplayerRoomPage)



router.get('/multiplayer',verifyToken,indexController.getMultiplayerPage);


router.get('/dashboard',verifyToken,indexController.getDashboardPage);


router.post('/shareroom',verifyToken,indexController.postShareRoom);

router.get('/winner',verifyToken,indexController.getWinner);

router.get('/', indexController.getIndexPage);



module.exports = router;
