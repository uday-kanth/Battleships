const nodemailer = require('nodemailer');
require("dotenv").config();
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'udaybirru03@gmail.com',
      pass: process.env.EMAIL_PASS
    }
  });

  const welcomeMail=(userMail)=>{

    var mailOptions = {
        from: 'udaybirru03@gmail.com',
        to: userMail ,
        subject: 'Battleships',
        text: 'Welcome to Battleships .Hope you enjoy the game'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


  }



  const sendRoomCode=(userMail,roomCode,player)=>{


    var mailOptions = {
        from: 'udaybirru03@gmail.com',
        to: userMail ,
        subject: 'Battleships',
        html: `
      <p>Player ${player} is inviting you to play Battleship Game.</p>
      <p>Please click the following link to join the game:</p>
      <a href="http://localhost:3000/multiplayer?roomCode=${roomCode}">Join Battleship Game</a>
    `
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });




  }


  module.exports={welcomeMail,sendRoomCode};