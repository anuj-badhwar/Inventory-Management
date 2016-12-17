  var mongoose = require('mongoose');
  var connection = mongoose.createConnection('mongodb://localhost/hcl');

  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

      var InventorySchema = new Schema({
          serial : {type:String},
          config:{type:String},
          location:{type:String},
          model:{type:String}
        });

  var Inventory = module.exports = connection.model('inventory',InventorySchema);

  module.exports.createEntry = function(newEntry,cb){
    newEntry.save(cb);
  }
