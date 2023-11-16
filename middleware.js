// const jwt = require('jsonwebtoken');
// const userModel = require('./model/users');
// const logger = require('./logger');

// const BearerTokenAuth = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if(!authHeader){
//             console.log('No bearer token');
//             return res.status(401).json({message: 'Unauthorized'});
//         } 
//         const token = authHeader.split(' ')[1];
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decodedToken.id);
//         if(!decodedToken){
//             console.log('Invalid bearer token');
//             return res.status(401).json({message: 'Unauthorized'});
//         }
//         req.user = user;
//         console.log('Bearer token authenticated');
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({message: 'Unauthorized'});
//     }
// }

// module.exports = BearerTokenAuth;