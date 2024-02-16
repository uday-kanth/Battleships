var express = require('express');
var router = express.Router();
const verifyToken=require('../middleware/authMiddleware');
const {sendRoomCode}=require("../utils/mailerUtil");



function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
  }
  return code;
}




router.get('/', async function(req, res, next) {
  const token = await req.cookies.jwtToken;
  if(!token){
    return res.render('signuplogin', { title: 'BattleShips' });
  }
  else{
    return res.redirect('/dashboard');
  }

  
});



router.get('/singleplayer',verifyToken,function(req,res,next){
res.render('singleplayer',{title:"BattleShips"});
})



router.get('/multiplayer/room',verifyToken,function(req,res,next){
  res.render('room',{title:"BattleShips"});
})



router.get('/multiplayer',verifyToken,function(req,res,next){

  const randomCode = generateRandomCode(6);
  const temp=req.query
  console.log(temp);
  const decoded=req.decoded;
if(Object.keys(temp).length>0){
  res.render('multiplayer',{title:"BattleShips",roomCode:req.query.roomCode,username:decoded.username,email:decoded.email});

}

else{
  res.render('multiplayer',{title:"BattleShips",roomCode:randomCode,username:decoded.username,email:decoded.email});

}

});




router.get('/dashboard',verifyToken,function(req,res,next){
  const decoded=req.decoded;
  res.render('index', { title: 'BattleShips',username:decoded.username,email:decoded.email });
});


router.post('/shareroom',verifyToken,function(req,res,next){

  try{

      console.log(req.body);
      const {email,roomCode,username}=req.body
    sendRoomCode(email,roomCode,username);

      res.status(200);
      res.send();



  }catch(error){
    console.log(error.message);
    res.send()
  }





})









module.exports = router;
