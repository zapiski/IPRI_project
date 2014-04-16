'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('main', function($scope, Class) {
	$scope.classes = Class.query();
  })
  .controller('browse', function($scope, Note) {
	$scope.notes = Note.query();
  })
  .controller('user', function($scope, User) {
	$scope.users = User.query();
  });
