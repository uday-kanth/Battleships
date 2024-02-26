const express = require('express');
const router = express.Router();
const friendsController=require('../controllers/friendsController')
const verifyToken=require('../middleware/authMiddleware');


router.post('/startRoomAndSendMail', verifyToken, friendsController.startRoomAndSendMail);

router.post('/unfriend',verifyToken,friendsController.postUnfriend)

router.post('/addFriend',verifyToken,friendsController.postAddFriend);

router.get("/friendsList",verifyToken,friendsController.getFriendList);

router.get('/checkFriend',verifyToken,friendsController.getCheckFriend);

router.get('/',verifyToken,friendsController.getFriendsPage);


module.exports = router;
