'use strict';
module.exports = function(app) {
  var api = require('../controllers/controllers');

  // Routes
  app.route('/employees')
    .get(api.list_all_employees)
    .post(api.create_an_employee);

  app.route('/employees/:_id')
    // .get(api.read_an_employee)
    .put(api.update_an_employee)
    .delete(api.delete_an_employee);

  app.route('/employees/:business')
    .get(api.list_all_employees_from_business);

};