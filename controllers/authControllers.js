const passport = require('passport');
const User = require("../db/collections/user");
const auth = require("../auth")


//Add the info to the data base
//create a new user
//check the user is real
//check the user info


//async because we talked with data base
const register = async (req, res) =>{

    //create a user
    User.register(new User({username: req.body.username}), req.body.password, (err, user) =>{
        if(err){
            return res.status(500).json({success:false, err:err});
        }

        //Extra authentication for create an account
        passport.authenticate('local')(req, res, () =>{
            return res.status(200).json({success: true, message: "Account created"});
        });
    });
};


const login = async (req, res) =>{
    //try it to login in, and given an token requestinfo.user.userId for generate the token
    const token = auth.getToken({_id: req.user._id}); //create the token

    //send the response and send the token
    return res.status(200).json({success: true, token: token, message: "logged in"})
};

//exports
module.exports = {register, login}


