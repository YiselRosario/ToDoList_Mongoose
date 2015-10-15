(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	function HomeFactory($http, $q) {
		var o = {};

// this get have to match with the GET call in the todoRouter.js at the top.
o.getTodos = function(){
	var q = $q.defer();
	$http.get('/api/v1/todo').then(function(res){
		q.resolve(res.data);
	});
	return q.promise;
};

//this works with the if and else button on the html
		o.unCompleteToDo = function(todo){
			var q =$q.defer();
			$http.patch('/api/v1/todo/' + todo._id).then(function(){
				q.resolve();
			});
			return q.promise;
		};

//This function was added after the vm.addToDo in the HomeController
		o.createToDo = function(newToDo){
			var q = $q.defer();
			// $HTTP.VERB('URL', BODY) this is what the bottom line means
			$http.post('/api/v1/todo', newToDo).then(function(res){
				q.resolve(res.data); // we pass res.data here because we want to get data back.
			});
			return q.promise;
		};


		o.completeToDo = function(todo){
			var q =$q.defer();
			$http.put('/api/v1/todo/' + todo._id).then(function(){
				q.resolve();
			});
			return q.promise;
		};

		// WORKS DELETE BUTTON
		o.deleteToDo = function(id){
      var q = $q.defer();
      $http.delete('api/v1/todo/' + id).then(function(){
        q.resolve();
      });
      return q.promise;
		};

		return o;
	}
})();
