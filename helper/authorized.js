const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    const token = jwt.sign(data, "koderahasia", {expiresIn: '1h'});
    return token; 
};
const verifyToken = (token) => {
    try {
      const data = jwt.verify(token, "koderahasia");
      return data;
    } catch (error) {
      throw new Error('Token is invalid');
    }
  };
  
  module.exports = { generateToken, verifyToken };
