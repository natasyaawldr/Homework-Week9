
const { verifyToken } = require('../helper/authorized');

const verify = (req,res,next) => {
    const bearerHeader = req.headers['authorization'];

    const token = bearerHeader.split(' ')[1];
    const data = verifyToken(token);

    if(data.role === 'Construction Worker') {
        next();
    } else {
        res.status(401).json({message : 'Unauthorized'});
    }
};

module.exports = verify;