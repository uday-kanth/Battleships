const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const DBconnection=require('../db/db');
const jwt = require('jsonwebtoken');
const {welcomeMail}=require('../utils/mailerUtil')



function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}






router.post('/signup', async function(req, res, next) {


try{   
    const client=await DBconnection.get();
    const collection=client.db('Battleships').collection('users');
    
    const {email,username,password}=req.body;
    console.log("haha"+password)
    const encryptedpassword=await bcrypt.hash(password, 8)
    if (!isValidEmail(email)) {
        res.status(400).json({ error: 'Please provide all required fields' });
    } 
else{
await collection.insertOne({
    email,
    username,
    password:encryptedpassword
});

welcomeMail(email);

res.status(200).json({ message: 'User signed up successfully'});
}

}catch(error){
    console.log(error.message);
    res.render('signuplogin',{title:"Battleships"})
}


});






router.post('/login',async(req,res)=>{

try{

const {email,password}=req.body;
const client=await DBconnection.get();
const collection=client.db('Battleships').collection('users');
//console.log(req.body)

const user=await collection.findOne({email});
//console.log(user)

if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
}


const passwordMatch = await bcrypt.compare(password, user.password);
//console.log(passwordMatch)
 if (!passwordMatch) {
 return res.status(401).json({ error: 'Authentication failed' });
 }

 const token = jwt.sign({ email,username:user.username},process.env.JWT_KEY, {expiresIn: '1h',});
 res.cookie('jwtToken', token, { withCredentials:true,sameSite:"strict" ,httpOnly: true}); 
 res.status(200).send();

 }catch (error) {
    console.log(error.message)
 res.status(500).json({ error: 'Login failed' });
 }





});


router.post('/logout', function(req, res) {
    res.clearCookie('jwtToken'); 
    res.status(200).json({ message: 'Logout successful' });
});





module.exports = router;
