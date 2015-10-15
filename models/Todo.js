var mongoose = require('mongoose');

var ToDoSchema = new mongoose.Schema({ // it could be call different, don't havr to be todoschema
  title: String,
  body: {required: true, type: String},
  created: Date,
  deleted: Date
});

mongoose.model('ToDo', ToDoSchema);
