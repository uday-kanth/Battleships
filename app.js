var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const socketIo = require('socket.io');
const http = require('http');
require('dotenv').config()
const verifyToken=require('./middleware/authMiddleware')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter=require('./routes/auth');




var app = express();
const server = http.createServer(app);
const io = socketIo(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.post('/getRoomIds',verifyToken,(req,res)=>{
  let joinCode=req.body.inputCode
  const decoded=req.decoded;


  //console.log(Object.keys(roomConnections))
  let rooms=Object.keys(roomConnections);

  if(roomConnections.hasOwnProperty(joinCode) && roomConnections[joinCode].length<2){
    

    res.redirect(`/multiplayer?roomCode=${joinCode}`);

  }
  else{
    res.status(400).send('no room')
  }

  

});


app.use('/auth', authRouter);
app.use('/', indexRouter);

app.use('/users', usersRouter);

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});











// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const roomConnections = {};

const MAX_PLAYERS_PER_ROOM = 2;



io.on('connection', socket => {
  const roomCode = socket.handshake.query.roomCode;
  //console.log(roomCode);

  if (!roomConnections.hasOwnProperty(roomCode)) {
    roomConnections[roomCode] = [];
  }
  if (roomConnections[roomCode].length >= MAX_PLAYERS_PER_ROOM) {
    // Notify the client that the room is full
    //socket.emit('roomFull', room);
    return;
  }

  // Find an available player number
  let playerIndex = roomConnections[roomCode].length;
  
  socket.join(roomCode);
  //console.log(socket.rooms);

  
  roomConnections[roomCode].push(socket);


  socket.emit('player-number', playerIndex);

  console.log(`Player ${playerIndex} has connected`)
  //console.log(roomConnections[roomCode])
  console.log(Object.keys(roomConnections))

  // Ignore player 3
  if (playerIndex === -1) return

 





  socket.on('disconnect', () => {
    

    
    // Leave the rooms and remove the socket from connections
    socket.leave(roomCode);



      // Remove the socket from the array of connections for the room
    roomConnections[roomCode] = roomConnections[roomCode].filter(conn => conn !== socket);
      //console.log("after disconnect "+Object.keys(roomConnections))
    socket.to(roomCode).emit('player-connection', playerIndex);
  
    
    // Remove empty rooms
    Object.keys(roomConnections).forEach(room => {
      if (roomConnections[room].length === 0) {
        delete roomConnections[room];
      }
    });
    
    console.log(`Player ${playerIndex} disconnected...............`)
    console.log(Object.keys(roomConnections))
  })




  socket.on('i-am-player-2',(username)=>{
    console.log(username)
    socket.to(roomCode).emit('i-am-player-2',username);
  })
  socket.on('i-am-player-1',(username)=>{
    socket.to(roomCode).emit('i-am-player-1',username);
  })




  socket.on('check-players', () => {
    const players = []
    roomConnections[roomCode].forEach((conn, index) => {
      const isConnected = true
      const playerID=index;
      const ready=false
      players.push({ connected: isConnected,playerID,ready});
    });
    console.log(players);
    //console.log(players)
    io.to(roomCode).emit('check-players', players)
  });


  socket.on('player-ready', () => {
    socket.to(roomCode).emit('enemy-ready', playerIndex);
  })



  socket.on('fire', id => {
    console.log(`Shot fired from ${playerIndex}`, id)

    // Emit the move to the other player
    socket.to(roomCode).emit('fire', id);

  })

  // on Fire Reply
  socket.on('fire-reply', square => {
    console.log(square)

    // Forward the reply to the other player
    socket.to(roomCode).emit('fire-reply', square)
  })

  // Timeout connection
  setTimeout(() => {
    
    socket.emit('timeout')
    socket.disconnect()
  }, 600000) // 10 minute limit per player




});








server.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});
module.exports = app;
