'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EntrySchema = new Schema({
  name: {
    type: String
	},
  Created_date: {
    type: Date    
  }  
});

module.exports = mongoose.model('Entry', EntrySchema);