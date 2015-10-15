(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(HomeFactory) {
		var vm = this;
	//	vm.todos;
		vm.newToDo = {}; //add this at the same time that we add the vm.addToDo function here.

vm.unCompleteToDo = function(todo){
	HomeFactory.unCompleteToDo(todo).then(function(){
		todo.deleted = null;
	});
};
// this works with the button in home html to mark a task as completed
vm.completeToDo = function(todo) {
	HomeFactory.completeToDo(todo).then(function(){
		todo.deleted = new Date();
	});
};

	// WORKS WITH DELETE BUTTON
 vm.deleteTodo = function(todo){
    HomeFactory.deleteToDo(todo._id).then(function(){
      vm.todos.splice(vm.todos.indexOf(todo),1);
    });
  };

//after add the inputs and buttons in the HTML file add this function in the controller
	vm.addToDo = function(){
		HomeFactory.createToDo(vm.newToDo).then(function(res){
			vm.newToDo = res;
			vm.todos.push(vm.newToDo);
			vm.newToDo = {};
		});
	};

		HomeFactory.getTodos().then(function(data){
			vm.todos = data;
		});
	}
})();
