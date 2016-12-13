var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hcl');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
      name: { type: String},
      reg_time: {type: Date, default: Date.now},
      username: { type: String},
      password: { type: String},
      email: { type: String}
  });

var User = module.exports = mongoose.model('user',UserSchema);

module.exports.createUser = function(newUser,cb){
  newUser.save(cb);
}
