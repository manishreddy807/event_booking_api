const User = require('../../model/User');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

module.exports = {
    createUser: async args => {
        try {
            const {userInput:{email, password},}= args;
            let user = await User.findOne({
                email
            });
            if(user){
                throw new Error('Email already Registered');
            }else{
                if(!validator.isEmail(email)){
                    throw new Error('Email is not valid')
                }
                const hashedPassword = await bycrypt.hash(password, 10)
                user = new User({
                    email,
                    password: hashedPassword,
                });
                user = await user.save();
                return {
                    ...user._doc,
                    password: null
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    },
    loginUser: async args => {
        try {
            const {
                userInput: {
                    email,
                    password
                },
            } = args;
            let user = await User.findOne({
                email
            });
            if(!user){
                throw new Error('Authentication Failed') 
            }
            let isMatch = await bycrypt.compare(password, user.password)
            if(!isMatch){
                throw new Error('password doesnot match') 
            }
            let expiresIn = 60*60*100;
            let lastLogin = Date.now();
            const token = await jwt.sign({
                userID: user.id,
                email: user.email
            },process.env.JWT_SECRET,{
                expiresIn: '1h'
            }
            );
            return{
                userID : user.id,
                token: token,
                expiresIn,
                lastLogin
            }
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    },
    loadUser : async (args, req) => {
        try {
            if(!req.isAuth){
                throw new Error('Session Expired, Kindly login now')
            }
            const user= await User.findOne({
                _id: req.userID
            }, {
                password: 0
            });
            return user;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }
}
