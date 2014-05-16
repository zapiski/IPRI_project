'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('main', function($scope, $firebase) {
	var classes = new Firebase("https://classnotes.firebaseio.com/classes");
	$scope.classes = $firebase(classes);
	$scope.addClass = function() {
		$scope.classes.$add({birthday: $scope.bd, 
							 description: $scope.de,
							 e-mail: $scope.em,
							 faculty: $scope.fa,
							 grade: $scope.gr,
							 id: $scope.id,
							 imageURL: $scope.im,
							 lastName: $scope.la,
							 module: $scope.mo,
							 name: $scope.na,
							 password: $scope.pa,
							 school: $scope.sc,
							 username: $scope.us
							 })
	}
  })
  .controller('browse', function($scope, $firebase) {
	var notes = new Firebase("https://classnotes.firebaseio.com/notes");
	$scope.notes = $firebase(notes);
	$scope.addNote = function() {
		$scope.notes.$add({	class: $scope.cl, 
							dateModified: $scope.daM,
							dateUploaded: $scope.daU,
							description: $scope.de,
							fileURL: $scope.fi,
							handwritten: $scope.ha,
							id: $scope.id,
							name: $scope.na,
							rating: $scope.ra,
							userUploaded: $scope.us,
							})
	}
  })
  .controller('user', function($scope, $firebase) {
	var users = new Firebase("https://classnotes.firebaseio.com/users");
	$scope.users = $firebase(users);
	$scope.addUser = function() {
		$scope.users.$add({
							allowedFaculties: $scope.cl,
							creditPoints: $scope.cl,
							grades: $scope.cl,
							name: $scope.cl,
							proffesor: $scope.cl,
							teachersAssistent: $scope.cl,
							university: $scope.cl,
							})
	}
  });
