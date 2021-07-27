const {Like} = require('../models/like.model');
const {extend, concat} = require('lodash');

const getLiked = async (req,res) => {
  try{
    const data = await Like.find({}).populate('likedList.video','name')
    res.status(200).json({success:true, data})
  }catch(error){
    res.status(500).json({success:false, message:"Couldn't fetchlike data", errorMessage: error.message})
  }
}

// const updateLiked = async(req,res) => {
//   const liked = req.body
//   liked.likedList.map(item => item._id = item.video)
//   try{
//     const data = new Like(liked)
//     await data.save();
//     res.status(201).json({success:true, data})
//   }catch(error){
//     res.status(500).json({success:false,  message:"Couldn't postnew data", errorMessage: error.message})
//   }
// }

const deleteLiked = async(req,res)=>{
  try{
    await Like.deleteMany({})
    res.status(200).json({deleted:true, success:true})
  }catch(error){
    res.status(500).json({deleted:false, success:false,message:"Couldn't Delete the collection",errorMessage:error.message})
  }
}

const getLikeModel = (req,res)=>{
  let {likeModel} = req
  likeModel.__v = undefined;
  res.status(200).json({success:true, data:likeModel})
}

const updateLikeModel = async (req,res)=>{
  const updateLikeModel = req.body
  let {likeModel} = req
  if(updateLikeModel.hasOwnProperty('likedList')){
    updateLikeModel.likedList._id = updateLikeModel.likedList.video
    const matched = likeModel.likedList.some(item => item._id ==updateLikeModel.likedList._id)
    if(matched){
      return res.status(400).json({success:false, message:"Sorry, Item is already present in the list. Please check with the id again"})
    }
    likeModel.likedList = concat(likeModel.likedList,updateLikeModel.likedList)
  }else {
    likeModel = extend(likeModel, updateLikeModel)
  }
  await likeModel.save()
  res.status(201).json({success:true, data:likeModel})
}

const deleteLikeModel = async (req,res)=>{
  let {likeModel}= req;
  await likeModel.remove();
  res.status(200).json({success:true, id:likeModel._id, deleted:true})
}

const getLikeItem = (req,res)=>{
  let {likeItem} = req
  likeItem.__v = undefined;
  res.status(200).json({success:true, data:likeItem})
}

const deleteLikeItem = async (req,res)=>{
  let {likeModel, likeItem} = req
  await likeItem.remove();
  await likeModel.save();
  res.status(200).json({success:true, id:likeItem._id, deleted:true})
}
module.exports = { getLiked, deleteLiked, getLikeModel, updateLikeModel, deleteLikeModel, getLikeItem, deleteLikeItem}