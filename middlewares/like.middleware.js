const {Like} = require('../models/like.model')

const findLikeModelByUserId = async (req,res,next) =>{
  const userId = req.user;
  try{
    const likeModel = await Like.findById(userId).populate('likedList.video','name videoId creator stats')
    if(!likeModel){
      return res.status(400).json({success:false,message:"Sorry, This user doesn't exist. Please check with your userId again"})
    }
    req.likeModel = likeModel
    next()
  }catch(err){
    return res.status(400).json({success:false, message:"Sorry, Something went wrong", errorMessage:err.message})
  }
}

const findLikeItemByLikeId = async (req,res,next,id) => {
  try{
    const likeItem = req.likeModel.likedList.find(item => item._id == id)
    if(!likeItem){
      return res.status(400).json({success:false, message:'Sorry, This like item doesn\'t exist. Please check with your likeId again.'})
    }
    req.likeItem = likeItem;
    next()
  }catch(err){
    return res.status(400).json({success:false, message:"Sorry, Something went wrong", errorMessage:err.message})
  }
}

module.exports = {findLikeModelByUserId, findLikeItemByLikeId}