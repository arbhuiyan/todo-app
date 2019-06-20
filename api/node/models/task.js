const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
     task: String,
     description: String,
     priority: Number,
     state: String
}, {versionKey: false});
module.exports = mongoose.model('Task', taskSchema);