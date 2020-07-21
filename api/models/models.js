'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EmployeesSchema = new Schema({
  id: {
    type: String,
    required: true, 
    unique: true, 
    index: true, 
    default: mongoose.Types.ObjectId 
  },
  firstname: {
    type: String,
    required: 'Enter the firstname of the employee'
  },
  lastname: {
    type: String,
    required: 'Enter the lastname of the employee'
  },
  business: {
    type: String,
    required: 'An employee must be attached to a business'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  birth_date: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Employees', EmployeesSchema);