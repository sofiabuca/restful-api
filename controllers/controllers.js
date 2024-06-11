const Album = require('../db/collections/album');

const getAllAlbums = async (req, res)=>{
    Album.find().then((albums)=>{
        if(!albums.length){
            return res.status(404).json({success: false, data: "No albums found."});
        }
        return res.status(200).json({sucess: true, data: albums});
    }).catch((err)=>{
        return res.status(400).json({success: false, error: err});
    });
};

const getAlbumById = async (req, res)=>{
    Album.findById(req.params.id).then((albumData)=>{
        return res.status(200).json({success: true, data: albumData});
    }).catch((err)=>{
        return res.status(400).json({success: false, error: err});
    });
};

const createAlbum = async (req, res)=>{
    const body = req.body;
    if(body.constructor === Object && Object.keys(body).length === 0) {
        return res.status(400).json({success: false, error: "You must provide album information"});
    }
    const newAlbum = new Album(body);
    if (!newAlbum){
        return res.status(400).json({success: false, error: "Album creation failed"});
    }
    newAlbum.save().then(()=>{
        return res.status(201).json({success: true, id: newAlbum._id, message: "Album created!"});
    }).catch(err =>{
        return res.status(400).json({success: false, error: err, message: "Album not created"});
    });
};

const updateAlbumById = async (req, res)=>{
    const body = req.body;
    if(body.constructor == Object && Object.keys(body).length === 0){
        return res.status(400).json({success: false, error: "You must specify an album"});
    }
    Album.findById(req.params.id).then((album)=>{
        if(album === null){
            return res.status(404).json({success: false, error: "Album id not found"});
        }
        if(body.album){
            album.album = body.album;
        }
        album.artist = body.artist;
        album.year = body.year;
        album.artwork = body.artwork;

        album.save().then(()=>{
            return res.status(200).json({success: true, id: album._id, message: "Album updated"});
        }).catch((err)=>{
            return res.status(400).json({success: false, error: err});
        });
    }).catch((err)=>{
        return res.status(400).json({success: false, error: err});
    });
};

const deleteAlbumById = async (req, res)=>{
    Album.findByIdAndDelete(req.params.id).then((album)=>{
        if(album === null){
            return res.status(404).json({success: false, error: "album id not found"});
        }
        return res.status(200).json({success: true, data: album, message: "Album deleted"});
    }).catch((err)=>{
        return res.status(400).json({success: false, error: err});
    });
};

module.exports = {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbumById,
    deleteAlbumById
};