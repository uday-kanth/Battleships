// Import necessary modules
const { sendRoomCode } = require("../utils/mailerUtil");
const {generateRandomCode}=require("../utils/generateRandomCode");


// Controller for GET '/'
exports.getIndexPage = async (req, res, next) => {
  try {
    const token = await req.cookies.jwtToken;
    if (!token) {
      return res.render('signuplogin', { title: 'BattleShips' });
    } else {
      return res.redirect('/dashboard');
    }
  } catch (error) {
    console.error('Error accessing index page:', error);
  }
};





// Controller for GET '/singleplayer'
exports.getSinglePlayerPage = (req, res, next) => {
  try {
    res.render('singleplayer', { title: 'BattleShips' });
  } catch (error) {
    console.error('Error accessing singleplayer page:', error);
  }
};




// Controller for GET '/multiplayer/room'
exports.getMultiplayerRoomPage = (req, res, next) => {
  try {
    res.render('room', { title: 'BattleShips' });
  } catch (error) {
    console.error('Error accessing multiplayer room page:', error);
  }
};






// Controller for GET '/multiplayer'
exports.getMultiplayerPage = (req, res, next) => {
  try {
    const randomCode = generateRandomCode(6);
    const temp = req.query;
    const decoded = req.decoded;
    if (Object.keys(temp).length > 0) {
      res.render('multiplayer', { title: 'BattleShips', roomCode: req.query.roomCode, username: decoded.username, email: decoded.email });
    } else {
      res.render('multiplayer', { title: 'BattleShips', roomCode: randomCode, username: decoded.username, email: decoded.email });
    }
  } catch (error) {
    console.error('Error accessing multiplayer page:', error);
  }
};




// Controller for GET '/dashboard'
exports.getDashboardPage = (req, res, next) => {
  try {
    const decoded = req.decoded;
    res.render('index', { title: 'BattleShips', username: decoded.username, email: decoded.email });
  } catch (error) {
    console.error('Error accessing dashboard page:', error);
  }
};







// Controller for POST '/shareroom'
exports.postShareRoom = async (req, res, next) => {
  try {
    const { email, roomCode, username } = req.body;
    await sendRoomCode(email, roomCode, username);
    res.status(200).send();
  } catch (error) {
    console.error('Error sharing room:', error);
    res.status(500).send('Internal Server Error');
  }
};


exports.getWinner=async(req,res,next)=>{

    
  const { winner, reason } = req.query;
    const decoded = req.decoded;
  
    try {
      res.render('winner', { title: 'Battleships', winner, reason ,username: decoded.username});
    } catch (error) {
      console.error('Error rendering winner page:', error);
      res.status(500).send('Internal Server Error');
    }
  


}
