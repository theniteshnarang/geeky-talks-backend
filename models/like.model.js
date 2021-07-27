const {Schema, SchemaTypes, model} = require('mongoose');
require('mongoose-type-url')

const ItemSchema = new Schema({
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
  }
})

const LikeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  likedList : [ItemSchema]
})

const Like = model('Like',LikeSchema)

module.exports = {Like}