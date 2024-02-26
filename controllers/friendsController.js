const DBconnection=require('../db/db');
const {generateRandomCode}=require("../utils/generateRandomCode");
const { sendRoomCode } = require("../utils/mailerUtil");



exports.getFriendsPage=async(req,res,next)=>{

    const decoded = req.decoded;
  
    try {
      const client=await DBconnection.get();
      const collection=client.db('Battleships').collection('users');
      const currentUser =decoded.username; // Provide the username of the current user
      const user = await collection.findOne({ username: currentUser });

      if (!user) {
        res.status(404).send('User not found');
        return;
      }

      // Retrieve details of friends using their usernames
      const friendsDetails = await collection.find({ username: { $in: user.friends } }).project({ username: 1, email: 1,_id:0 }).toArray();

      res.render('friends',{ title: 'BattleShips', username: decoded.username, email: decoded.email,friends:friendsDetails })
    } catch (error) {
      console.error('Error rendering the friends page:', error);
      res.status(500).send('Internal Server Error');
    }
  


}

exports.getCheckFriend=async(req,res,next)=>{

    const decoded=req.decoded;
    const enemyusername = req.query.enemyusername;
    try{
        const client=await DBconnection.get();
        const collection=client.db('Battleships').collection('users');
        
        //console.log(enemyusername+"************************************")
        if(enemyusername){


        const result=await collection.findOne({ username:decoded.username, friends: { $in: [enemyusername] } });
        if(result){
            res.json({check:true});
        }
        else{
            res.json({check:false});
        }
    }
    else{
        res.json({message:"no username provided to check"})
    }
    
    
    
    
    
}catch(error){
        console.log(error.message);
    }





}


exports.postAddFriend=async(req,res,next)=>{

    const decoded = req.decoded;
    console.log(req.body)
    
    try {
      
      const client=await DBconnection.get();
      const collection=client.db('Battleships').collection('users');

      const alreadyExists=await collection.findOne({ username:decoded.username, friends: { $in: [req.body.enemyusername] } });

      if(alreadyExists){
        return res.send("already exists");
      }


      const result = await collection.updateOne(
        { email: decoded.email },
        { $push: { friends: req.body.enemyusername } }
    );
  
    if (result.modifiedCount === 1) {
        console.log(`Successfully added ${req.body.enemyusername} to the friends list of user with email ${decoded.email}`);
        res.send("success");
  
    } else {
        console.log(`User with email ${decoded.email} not found or update operation failed`);
        res.send("failed")
    }
      
    } catch (error) {
      console.error('Error Adding the friend to the list :', error);
      res.status(500).send('Internal Server Error');
    }
  
  
  
  }



  exports.getFriendList=async(req,res,next)=>{

    const decoded = req.decoded;
    console.log(req.body)
    
    try {
      
      const client=await DBconnection.get();
      const collection=client.db('Battleships').collection('users');
      const currentUser =decoded.username; // Provide the username of the current user
      const user = await collection.findOne({ username: currentUser });

      if (!user) {
        res.status(404).send('User not found');
        return;
      }

      // Retrieve details of friends using their usernames
      const friendsDetails = await collection.find({ username: { $in: user.friends } }).project({ username: 1, email: 1,_id:0 }).toArray();

      res.json({ friends: friendsDetails });
      
  
      
    } catch (error) {
      console.error('Error getting the Friends List:', error);
      res.status(500).send('Internal Server Error');
    }



  }



  exports.postUnfriend=async(req,res,next)=>{

    const decoded = req.decoded;
    console.log(req.body)
    const { friend } = req.body;

    try{

      const client=await DBconnection.get();
      const collection=client.db('Battleships').collection('users');
      const currentUser =decoded.username; // Provide the username of the current user
      const user = await collection.findOne({ username: currentUser });



      if (!user) {
        res.status(404).send('User not found');
        return;
      }

      const updatedUser = await collection.findOneAndUpdate(
        { username: currentUser },
        { $pull: { friends: friend } },
        { returnOriginal: false }
      );

      // Send a success response
      res.status(200).send('Successfully unfriended ' + friend);


    }
    catch(error){
      console.error('Error unfriending friend:', error);
      res.status(500).send('Internal Server Error');

    }




  }






  exports.startRoomAndSendMail = async (req, res, next) => {
    const decoded = req.decoded;
    const friendUsername = req.body.friend;

    try {
        // Your logic to start a room and get the room code
        const roomCode = generateRandomCode(6);// Replace with your logic to generate room code

        // Send the room code via email to the friend
        const client = await DBconnection.get();
        const collection = client.db('Battleships').collection('users');
        const friend = await collection.findOne({ username: friendUsername });

        if (!friend) {
            res.status(404).send('Friend not found');
            return;
        }

        sendRoomCode(friend.email, roomCode, decoded.username);
        res.json({url:`/multiplayer?roomCode=${roomCode}`})
    } catch (error) {
        console.error('Error starting room and sending mail:', error);
        res.status(500).send('Internal Server Error');
    }
};