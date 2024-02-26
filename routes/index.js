var express = require('express');
var router = express.Router();
const verifyToken=require('../middleware/authMiddleware');
const indexController=require('../controllers/indexController');




 


router.get('/singleplayer',verifyToken,indexController.getSinglePlayerPage);

router.get('/multiplayer/room',verifyToken,indexController.getMultiplayerRoomPage)

router.get('/multiplayer',verifyToken,indexController.getMultiplayerPage);


router.get('/dashboard',verifyToken,indexController.getDashboardPage);

router.get('/winner',verifyToken,indexController.getWinner);

router.get('/', indexController.getIndexPage);


router.post('/shareroom',verifyToken,indexController.postShareRoom);


module.exports = router;
