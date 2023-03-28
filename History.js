const mongoose = require('mongoose')
const Schema = mongoose.Schema
const HistorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('History', HistorySchema)
