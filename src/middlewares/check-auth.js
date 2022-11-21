const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  try { 
    const token = req.headers.authorization.split(" ")[1];
    // console.log('token', token);
    const decodedToken = jwt.verify(token, authConfig.secret);
    // console.log('decodedToken', decodedToken);
    req.userData = { userEmail: decodedToken.userEmail, userId: decodedToken.userId, userPermission: decodedToken.userPermission };
    // console.log('req.userData', req.userData);
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({ message: "You are not authenticated!" });
  }
}