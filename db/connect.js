const mongoose = require('mongoose');

mongoose.set('strictQuery', true);




const username = "laurabuitrago98";
const password = "1234";
const dbname = "music_app"; //Create a data base

const uri = `mongodb+srv://laurabuitrago98:${password}@cluster0.lofhwso.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(uri).then((con)=>{
    console.log("connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

const db = mongoose.connection;


// // user creds for db
// const username = "laurabuitrago98";
// const passwd = "1234";


// // database details
// const dbname = "game";
// //const uri = mongodb+srv://${username}:${passwd}@web602-db.gr9k9w0.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=WEB602-DB;
// const uri = `mongodb+srv://laurabuitrago98:${passwd}@cluster0.lofhwso.mongodb.net/${dbname}?retryWrites=true&w=majority`;