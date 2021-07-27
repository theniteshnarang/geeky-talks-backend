const {Schema, SchemaTypes, model} = require('mongoose');
require('mongoose-type-url')

const ItemSchema = new Schema({
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
  }
})

const SaveSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  name: String,
  videos: [ItemSchema]
})

const Save = model('Save',SaveSchema)

module.exports = {Save}