'use strict';


let mongoose = require('mongoose'),
  Entry = mongoose.model('Entry');

exports.list_all_entry = function(req, res) {
  Entry.find({}, function(err, entry) {
    if (err)
      res.send(err);
    res.json(entry);
  });
};

exports.list_by_id = function(req, res) {
  Entry.findById(req.params.id, function(err, entry) {
    if (err)
      res.send(err);
    res.json(entry);
  });
};

exports.create_a_entry = function(req, res) {
    let new_entry = new Entry(req.body);
    new_entry.save(function (err, entry) {
        if (err)
            res.send(err);
        res.json(entry);
    });
};

exports.update_a_entry = function(req, res) {
    Entry.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
       if (err)
          res.send(err);
          res.json(task);
    });
};



