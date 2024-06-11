const express = require('express');
const router = express();
const albumController = require('../controllers/controllers');

const passport = require('passport'); //requiere the passport for authentication
const authConroller = require('../controllers/authControllers');
const auth = require('../auth');

//Authentication
router.post('/register', authConroller.register);
router.post('/login', passport.authenticate('local', {session:false}), authConroller.login);  //aunthenticate if the user is real


// GET ALL ROUTE
router.get('/music',auth.verifyUser ,albumController.getAllAlbums); //Add the authentication -> auth.verifyUser 

// GET BY ID ROUTE
router.get('/music/:id', albumController.getAlbumById);

// CREATE ROUTE
router.post('/music', albumController.createAlbum);

// UPDATE ROUTE
router.put('/music/:id', albumController.updateAlbumById);

// DELETE ROUTE
router.delete('/music/:id', albumController.deleteAlbumById);

module.exports = router;