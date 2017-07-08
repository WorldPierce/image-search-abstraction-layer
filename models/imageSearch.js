//requirements for mongoose and schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Model
var urlSchema = new Schema({
  term: String,
  when: Date
  
}, {timeStamps: true});
//collection and schema
var ModelClass = mongoose.model('imageSearch', urlSchema);
//allows to access in server,js
module.exports = ModelClass;