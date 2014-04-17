'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('main', function($scope, Class) {
	$scope.classes = Class.query();
	$scope.orderProp = 'name';
  })
  .controller('browse', function($scope, Note) {
	$scope.notes = Note.query();
	$scope.orderProp = 'name';

  })
  .controller('user', function($scope, User) {
	$scope.users = User.query();
  });
