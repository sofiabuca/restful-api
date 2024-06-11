//Import libraries

const passport = require("passport"); //npm i passport -> mangament the authention proccess
const JwtStrategy = require("passport-jwt").Strategy; //npm i passport-jwt (CREATE THE WEB TOKEN) -> json web token
const ExtractJwt = require("passport-jwt").ExtractJwt; //(INTERPRETED THE WEB TOKEN) -> extract json web token
const localStrategy = require("passport-local").Strategy; //npm i passport-local (AUTHENTICATHER THE USER) -> created it them
const jwt = require("jsonwebtoken"); //npm i jsonwebtoken -> json web tokens

const User = require("./db/collections/user"); //user model -> user information store
passport.use(new localStrategy(User.authenticate())); //Use the authentication model -> communicate btw data base

//Set up session information
//Store the token information 
passport.serializeUser(User.serializeUser()); //save the user information in the session for us -> store it
passport.deserializeUser(User.deserializeUser()); //deserialize user -> grab it

//Scrambelt the information - random a long string
const SECRET_KEY = "9rujedpkkijnfiuheuvcnvwi0t856nvrngjnr75Y45YHGE4GVRWCFWY65gtrh4664";

//Create a token -> the person that have this infro have access to the info
const getToken = (user) =>{
    //take user information using the secret key and give them a experite date
    return jwt.sign(user, SECRET_KEY, {expiresIn:3600}); //authorizate usign the secret key and when it expire 
};

//Extract the token
const opts ={
    //extract info
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //Secret key
    secretOrKey: SECRET_KEY
};

//Send the information (use -> taking btw software) jwt_payload -> infromation return in the toke
//passport -> how to talk with data base
// JwtStrategy -> information about cliente
//opts -> going to be a token and when you find it call the call back function
//done -> call back function 
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    //Find the user in they token, and look they id

    User.findById(jwt_payload._id).then( (user) =>{
        //check if the user exist
        if(user){
            //passport continue to do what it do -> no error -> return the user information
            return done(null, user);
        }
        // return an error
        return done(error, false)
    }).catch( (err) =>{
        //send the error to our done
        return done(err, false);
    });
}));


//Autenticate the user
//use passport -> has been used for express for so long, beacuse we using passport local (differnet library ) -> {session:false} -> we don't want that page use express for the aunthetication
const verifyUser = passport.authenticate('jwt', {session:false});

//Export
module.exports = {
    getToken, //create token for the user
    verifyUser //verify the user based in the token
};