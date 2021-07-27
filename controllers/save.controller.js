const {Save} = require('../models/save.model')
const {extend, concat} = require('lodash');

const getSaved = async (req,res) => {
  try{
    const data = await Save.find({}).populate('videos.video','name')
    res.status(200).json({success:true, data})
  }catch(error){
    res.status(500).json({success:false,message:"Couldn't fetch save data", errorMessage:error.message})
  }
}

const addNewSaved = async(req,res) => {
  const saved = req.body
  saved.videos.map(item => item._id = item.video)
  try{
    const data = new Save(saved)
    await data.save();
    res.status(201).json({success:true, data})
  }catch(error){
    res.status(500).json({success:false, message:"Couldn't post new data", errorMessage:error.message})
  }
}

const deleteSaved = async(req,res)=>{
  try{
    await Save.deleteMany({})
    res.status(200).json({deleted:true, success:true})
  }catch(error){
    res.status(500).json({deleted:false, success:false,message:"Couldn't Delete the collection",errorMessage:error.message})
  }
}

// findPlaylistByUserId Middleware Here

const getAllPlaylist = (req,res)=>{
  let {playlist} = req
  res.status(200).json({success:true, data:playlist})
}

const addNewPlaylist = async(req,res) => {
  const newPlaylist =req.body
  newPlaylist.user = req.user
  console.log({newPlaylist})
  newPlaylist.videos.map(item => item._id = item.video)
  try {
    const data = new Save(newPlaylist)
    await data.save();
    const modifyResponse = { _id: data._id, name: data.name, video:data.videos[0].video}
    res.status(201).json({success:true, data:modifyResponse, created:true})
  }catch(error){
    res.status(500).json({success:false, message:"Couldn't Add New Playlist", errorMessage:error.message})
  }
}

const removeAllPlaylist = async(req,res) => {
  const userId = req.user
  try{
    await Save.deleteMany({user:userId})
    res.status(200).json({deleted:true, success:true})
  }catch(error){
    res.status(500).json({deleted:false, success:false,message:"Couldn't delete the all playlists",errorMessage:error.message})
  }
}

// findPlaylistById Middleware Here

const getSinglePlaylist = (req,res)=>{
  let {singlePlaylist} = req
  singlePlaylist.__v = undefined;
  res.status(200).json({success:true, data:singlePlaylist})
}

const updateSinglePlaylist = async (req,res)=>{
  const updatePlaylist = req.body
  let {singlePlaylist} = req
  if(updatePlaylist.hasOwnProperty('videos')){
    updatePlaylist.videos._id = updatePlaylist.videos.video
    const matched = singlePlaylist.videos.some(item => item._id == updatePlaylist.videos._id)
    if(matched){
      return res.status(400).json({success:false, message:"Sorry, Item is already present in the list. Please check with the id again"})
    }
    singlePlaylist.videos = concat(singlePlaylist.videos,updatePlaylist.videos)
  }else {
    singlePlaylist = extend(singlePlaylist, updatePlaylist)
  }
  try {
    await singlePlaylist.save()
    res.status(201).json({success:true, data:singlePlaylist})
  }catch(error){
    res.status(500).json({success:false, message:"Couldn't update the playlist", errorMessage:error.message})
  }  
}

const deleteSinglePlaylist = async (req,res)=>{
  let {singlePlaylist} = req
  try {
    await singlePlaylist.remove();
    res.status(200).json({success:true, id:singlePlaylist._id, deleted:true})
  }catch(error){
    res.status(500).json({success:false, message:"Couldn't remove the playlist", errorMessage:error.message})
  }
}

const getSinglePlaylistVideo = (req,res) => {
  const {video} = req
  res.status(200).json({success:true, data:video})
}

const deleteSinglePlaylistVideo = async (req,res) => {
  const {video, singlePlaylist} = req
  try {
    await video.remove()
    await singlePlaylist.save()
    res.status(200).json({success:true, id:video._id, deleted:true})
  }catch(error){
    res.status(500).json({success:false, message:"Couldn't remove the video", errorMessage:error.message})
  }
}
module.exports = {getSaved, addNewSaved, deleteSaved, getAllPlaylist, addNewPlaylist, removeAllPlaylist, getSinglePlaylist, updateSinglePlaylist, deleteSinglePlaylist, getSinglePlaylistVideo, deleteSinglePlaylistVideo}