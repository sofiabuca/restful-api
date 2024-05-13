const express = require('express');
const router = express();
const albumController = require('../controllers/controllers');


// GET ALL ROUTE
router.get('/music', albumController.getAllAlbums);

// GET BY ID ROUTE
router.get('/music/:id', albumController.getAlbumById);

// CREATE ROUTE
router.post('/music', albumController.createAlbum);

// UPDATE ROUTE
router.put('/music/:id', albumController.updateAlbumById);

// DELETE ROUTE
router.delete('/music/:id', albumController.deleteAlbumById);

module.exports = router;