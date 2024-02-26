const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DBconnection=require('../db/db');
const {welcomeMail}=require('../utils/mailerUtil')

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const client=await DBconnection.get();
    const collection=client.db('Battleships').collection('users');
    const { username, email, password } = req.body;
    
    
    const existingUser = await collection.findOne({ $or: [{ email: email }, { username: username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email OR Username already exists' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    } 

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await collection.insertOne({
        email,
        username,
        password:hashedPassword,
        friends: []
    });
    
    welcomeMail(email);
    
    res.status(200).json({ message: 'User signed up successfully'});
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





// User login
exports.loginUser = async (req, res) => {
  try {
    const {email,password}=req.body;
    const client=await DBconnection.get();
    const collection=client.db('Battleships').collection('users');

    const user=await collection.findOne({email});

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }


    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ email,username:user.username},process.env.JWT_KEY, {expiresIn: '1h',});
    res.cookie('jwtToken', token, { withCredentials:true,httpOnly: true}); 
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// User logout
exports.logoutUser = (req, res) => {
  // Clear the JWT token from client-side
  res.clearCookie('jwtToken');
  res.status(200).json({ message: 'Logout successful' });
};
