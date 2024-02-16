const jwt = require('jsonwebtoken');
require("dotenv").config();
async function verifyToken(req, res, next) {
const token = await req.cookies.jwtToken;

if (!token) {
    res.status(401);
    return res.render('signuplogin',{title:"Battleships"});
};
try {
 const decoded = jwt.verify(token,process.env.JWT_KEY);
 req.decoded= decoded;
 next();
 } catch (error) {
res.status(401);
 res.render('signuplogin',{title:"Battleships"});
 }
 };

module.exports = verifyToken;