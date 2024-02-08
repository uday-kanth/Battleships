var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BattleShips' });
});
router.get('/singleplayer',function(req,res,next){
res.render('singleplayer',{title:"BattleShips"});
})

router.get('/multiplayer',function(req,res,next){
  res.render('multiplayer',{title:"BattleShips"});
  })


module.exports = router;
