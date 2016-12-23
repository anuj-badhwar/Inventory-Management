  var mongoose = require('mongoose');
//  var connection = mongoose.createConnection('mongodb://localhost/hcl');
  var UserModel = require('./user');

  var connection = UserModel.CONNECTION;
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

      var InventorySchema = new Schema({
          serial : {type:String},
          rack:String,
          config:{type:String},
          location:{type:String},
          model:{type:String},
          asset:String,
          server:String,
          Make:String,
          AMC:String,
          VSH:String,
          virtual:String,
          VSN:String,
          IP:String,
          DCIB:String,
          Host:String,
          OS:String,
          License:String,
          Owner:String,
          LAN:String,
          Config:String,
          Storage:String,
          RAID:String,
          Backup:String
        });

  var Inventory = module.exports = connection.model('inventory',InventorySchema);

  module.exports.createEntry = function(newEntry,cb){
    newEntry.save(cb);
  }

  module.exports.findEntry = function(serial,cb){
    Inventory.findOne({serial:serial},cb);
  }
