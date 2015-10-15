var uuid = require('uuid');
var ToDoModule = {
  todos: [],
  find: function(id, cb){ // after this go to the router and take out all inside the param function.
    for(var i=0; i< this.todos.length; i++){
      if(id === this.todos[i].id){
        return cb(null, this.todos[i]);
      }
    }
    cb({err: "Could not find:" + id});
  },
  create: function(todo, cb){
    if(!todo.title || !todo.body){
      return cb({err: "Please fill out all fields."});
    }
    var newToDo = new ToDo(todo.title, todo.body);
    this.todos.push(newToDo);
    cb(null, newToDo);
  },
  remove: function(tod, cb){
    if(this.todos.indexOf(todo) === -1){
      return cb({err: "Could not find:" + todo.id});
    }
    this.todos.splice(this.todos.indexOf(todo), 1);
    cb(null,"succes!");
  }
};


function ToDo(title, body){
  this.title = title;
  this.body = body;
  this.created = new Date();
  this.deleted = null;
  this.id =  uuid.v4();
}
// after the function start the To Do list in the
 ToDoModule.todos.push(new ToDo('Work',"Hobbie"), new ToDo('Angular','Cook'), new ToDo('Dance', 'afternoon'));

module.exports = ToDoModule;
