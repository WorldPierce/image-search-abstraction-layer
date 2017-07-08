var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  term: String,
  when: String
  
}, {timeStamps: true});
//collection and schema
var ModelClass = mongoose.model('imageSearch', urlSchema);
//allows to access in server,js
module.exports = ModelClass;