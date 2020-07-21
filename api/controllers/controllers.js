'use strict';


var mongoose = require('mongoose'),
  Employees = mongoose.model('Employees');

exports.list_all_employees = function(req, res) {
	Employees.find({},   function(err, employees) {
    if (err)
      res.send(err);
    res.json(employees);
  });
};

exports.create_an_employee = function(req, res) {
  var new_employee = new Employees(req.body);
  new_employee.save(function(err, employee) {
    if (err)
      res.send(err);
    res.json(employee);
  });
};

exports.read_an_employee = function(req, res) {
	Employees.findById(req.params._id, function(err, employee) {
    if (err)
      res.send(err);
    res.json(employee);
  });
};

exports.update_an_employee = function(req, res) {
	Employees.findOneAndUpdate({_id: req.params._id},  req.body, {new: true}, function(err, employee) {
    if (err)
      res.send(err);
    res.json(employee);
  });
};

exports.delete_an_employee = function(req, res) {
	Employees.remove({
    _id: req.params._id
  }, function(err, employee) {
    if (err)
      res.send(err);
    res.json({ message: 'Employee successfully deleted' });
  });
};

exports.list_all_employees_from_business = function(req, res)
{
  Employees.find({business: req.params.business}, function(err, employees) {
    if (err)
      res.send(err);
    res.json(employees);
  });
};