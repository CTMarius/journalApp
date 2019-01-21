'use strict';

module.exports = function(app) {
  let journal = require('../controllers/journalController');

  app.route('/entry')
    .get(journal.list_all_entry)	
    .post(journal.create_a_entry);	

  app.route('/entry/:id')
     .get(journal.list_by_id)
     .put(journal.update_a_entry);
};