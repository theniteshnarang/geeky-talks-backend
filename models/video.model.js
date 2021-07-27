const {Schema, SchemaTypes, model} = require('mongoose');
require('mongoose-type-url')

const VideoSchema = new Schema({
  videoId:{
    type: String,
    unique:true,
    required: "Can't post without a id, please enter video id"
  },
  name:{
    type: String,
    required: "Can't post without name, please enter name"
  },
  entity:{
    type: String,
    required:true,
    default:'conference'
  },
  desc: [{
    type: String
  }],
  creator : {
    name: String,
    subsribers:String,
    channel: String,
    avatar: SchemaTypes.Url,
  },
  uploadOn: String,
  duration:String,
  stats: {
    like: Number,
    dislike:Number,
    views: Number,
  }
},{
  timestamps:true
})

const Video = model("Video", VideoSchema)

module.exports = { Video }  