const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1]
    if(!token || token === ''){
        req.isAuth =false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        req.isAuth = false;
        return next()
    }
    if(! decodedToken){
        req.isAuth = false;
        return next()
    }
    req.isAuth =true;
    req.userID = decodedToken.userID,
    req.token = token;
    next();
}