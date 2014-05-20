'use strict';

/* Controllers */
var user_id;
angular.module('myApp.controllers', [])
	.controller('main', function($scope, Session, $firebase) {
		$scope.auth = Session.isAuthenticated();
		$scope.userL = Session.getUserL();
		$scope.userB = Session.getUserB();
	
		var classes = new Firebase("https://classnotes.firebaseio.com/classes");
		$scope.classes = $firebase(classes);
	})
	.controller('browse', function($scope, Session, $firebase) {
		$scope.auth = Session.isAuthenticated();
		$scope.userL = Session.getUserL();
		$scope.userB = Session.getUserB();
	
		var notes = new Firebase("https://classnotes.firebaseio.com/notes");
		$scope.notes = $firebase(notes);
	})
	.controller('user', function($scope, Session, $firebase, $window) {
		$scope.auth = Session.isAuthenticated();
		$scope.userL = Session.getUserL();
		$scope.userB = Session.getUserB();
	
		var users = new Firebase("https://classnotes.firebaseio.com/users");
		var ref = new Firebase("https://classnotes.firebaseio.com");
		var auth = new FirebaseSimpleLogin(ref, function(error, user){
			if (user){
				user_id = user.uid;
			} else {
				console.log("User is not logged in! Redirecting to main page.");
			}
		});
	})
	.controller('signup', function($scope, Session, $firebase, $window){
		var ref = new Firebase("https://classnotes.firebaseio.com");
		var auth = new FirebaseSimpleLogin(ref, function(error, user) {
			if (error) {
				// an error occurred while attempting login
				console.log(error);
			} else if (user) {
				// user authenticated with Firebase
				$scope.user = user
				user_id = user.uid;
				
				Session.login(user); //dodamo userja
				
				console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
				
			} else {
				// user is logged out
			}
		}); 
		$scope.signup = function(){
			auth.createUser($scope.user.email, $scope.user.password, function(error, user) {
				if (!error) {
					var users = new Firebase("https://classnotes.firebaseio.com/users");
					$scope.users = $firebase(users);
					
					var userProperties = {
						email: user.email,
					}
					
					if ($scope.user.description !== undefined){
						userProperties.description = $scope.user.description;
					}else{
						userProperties.description = "";
					}
					
					$scope.users[user.uid] = userProperties;
					$scope.users.$save(user.uid);
					
					auth.login('password', {
						email: $scope.user.email,
						password: $scope.user.password,
						rememberMe: true
					});
				}else{
					console.log(error);
					alert("There was an error creating a user! The email is probably already in use!");
				}
			});
		};
	})
	.controller('login', function($scope, Session, $firebase, $window){
		var login = new Firebase("https://classnotes.firebaseio.com");
		var auth = new FirebaseSimpleLogin(login, function(error, user) {
			if (error) {
				console.log(error);
			} else if (user) {
				user_id = user.uid;
				console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
				
				Session.login(user); //dodamo userja
			
			} else {
				console.log("user is logged out");
			}
		}); 
		$scope.loginPW = function() {
			auth.login('password', {
				email: $scope.login.email,
				password: $scope.login.password,
			});
		}
		$scope.loginFB = function() {
			auth.login('facebook', {
				scope: 'email,user_likes'
			});
		}
		$scope.loginGOOGLE = function(){
			auth.login('google', {
			  scope: 'https://www.googleapis.com/auth/plus.login'
			});
		}
		$scope.loginTWITTER = function(){
			auth.login('twitter', {
			});
		}
		
	})
	.controller('navBarController', function($scope, Session, $firebase, $window){
		$scope.$watch(Session.isAuthenticated, function() {
			$scope.auth = Session.isAuthenticated();
			$scope.userL = Session.getUserL();
			$scope.userB = Session.getUserB();
		});
	
		var dataRef = new Firebase("https://classnotes.firebaseio.com");
		var auth = new FirebaseSimpleLogin(dataRef, function(error, user){
			if (user){
				user_id = user.uid;
				$scope.isUserLoggedIn = true;
			} else {
				$scope.isUserLoggedIn = false;
			}
		});
		$scope.logout = function(){
			auth.logout();
			$window.location.href = '#/main/';
		}
	});