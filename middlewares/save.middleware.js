const {Save} = require('../models/save.model')

const findPlaylistByUserId = async (req,res,next) =>{
  const userId = req.user
  try{
    const playlist = await Save.find({user:userId}).populate('videos.video','name videoId creator stats')
    console.log({playlist})
    if(playlist.length === 0){
      return res.status(200).json({success: true, data:[],message:"User doesn't have any playlist"})
    }
    req.playlist = playlist
    next()
  }catch(error){
    return res.status(400).json({success:false, message:"Sorry, Something went wrong", errorMessage:error.message})
  }
}

const findPlaylistById = async (req,res,next,id) =>{
  try{
    const singlePlaylist = req.playlist.find(item => item._id == id)
    
    if(!singlePlaylist){
      return res.status(400).json({success:false, message:'Sorry, This playlist item doesn\'t exist. Please check with your playlistId again.'})
    }
    req.singlePlaylist = singlePlaylist;
    next()
  }catch(error){
    return res.status(400).json({success:false, message:"Sorry, Something went wrong", errorMessage:error.message})
  }
}

const findVideoById = async(req,res,next,id) => {
  const {singlePlaylist} = req
  try {
    const video = singlePlaylist.videos.id(id)
    if(!video){
      return res.status(400).json({success:false, message:'Sorry,This video item doesn\'t exist. Please check with your videoId again.'})
    }
    req.video = video
    next()
  }catch(error){
    res.status(400).json({success:false, message:"Sorry, Something went wrong", errorMessage:error.message})
  }
}

module.exports = {findPlaylistByUserId, findPlaylistById, findVideoById}