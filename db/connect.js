const mongoose = require('mongoose');

mongoose.set('strictQuery', true);


const username = "laurabuitrago98";
const password = "2011458Sofia";
const dbname = "music_app"; //Create a data base

const uri = `mongodb+srv://laurabuitrago98:${password}@cluster0.lofhwso.mongodb.net/${dbname}?retryWrites=true&w=majority`;;
mongoose.connect(uri).then((con)=>{
    console.log("connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

const db = mongoose.connection;