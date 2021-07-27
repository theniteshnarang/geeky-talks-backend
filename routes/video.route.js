const router = require("express").Router();
const { Video } = require('../models/video.model')
const videoData = require('../videoData.json')
const { extend } = require('lodash')

router.route("/")
  .get(async (req, res) => {
    try {
      let videos = await Video.find({})
      videos = videos.slice(0,8)
      res.status(200).json({ success: true, data:videos })
    } catch (error) {
      res.status(500).json({ success: false, message: "Couldn't get videos data", errorMessage: error.message })
    }
  })
  .post(async (req, res) => {
    try {
      const video = req.body;
      const NewVideo = new Video(video)
      const data = await NewVideo.save()
      res.status(201).json({ success: "true", data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Couldn't add new video to the database", errorMessage: error.message })
    }
  })
  .delete(async(req,res)=>{
    try{
      await Video.deleteMany({})
      res.status(200).json({ deleted:true, success:true})
    }catch(error){
      res.status(500).json({ deleted:false, success:false, message:"Couldn't Delete the collection", errorMessage:error.message })
    }
  })


router
  .route("/seed")
  .get(async (req, res) => {
    try {
      const savedVideos = await Video.insertMany(videoData)
      if (!savedVideos) {
        console.log("Video are not saved in database")
      }
      res.status(200).json({ message: "All videos are successfully saved to the database" })
    } catch (error) {
        res.status(500).json({ success: 'false', message: "Videos Insertion failed, please try seeding again.", errorMessage: error.message
        })
      }
  })

  router.param('videoId', async (req, res, next, id) => {
  try {
    const video = await Video.findById(id)
    if (!video) {
      return res.status(400).json({ success: false, message: "Couldn't find your video, Please check with productId again." })
    }
    req.video = video
    next()
  } catch (error) {
    res.status(400).json({ success: false, message: "Please check with your id again", errorMessage: error.message })
  }
})

router.route('/:videoId')
  .get((req, res) => {
    let { video } = req
    video.__v = undefined;
    res.status(200).json({ success: true, data:video })
  })
  .post(async (req, res) => {
    const updatedVideo = req.body
    let { video } = req
    video = extend(video, updatedVideo)
    video = await video.save()
    res.status(201).json({ success: true, data:video })
  })
  .delete(async (req, res) => {
    let { video } = req;
    video = await video.remove()
    res.status(200).json({ success: true, data:video._id, deleted:true})
  })


module.exports = router