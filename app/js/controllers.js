'use strict';

/* Controllers */
var user_id;
angular.module('myApp.controllers', [])
	.controller('main', function($scope, $firebase) {
		var classes = new Firebase("https://classnotes.firebaseio.com/classes");
		$scope.classes = $firebase(classes);
		$scope.addClass = function() {
			$scope.classes.$add({ 
				allowedFaculties: $scope.cl,
				creditPoints: $scope.cl,
				grades: $scope.cl,
				name: $scope.cl,
				proffesor: $scope.cl,
				teachersAssistent: $scope.cl,
				university: $scope.cl,
			})
		}
	})
	.controller('browse', function($scope, $firebase) {
		var notes = new Firebase("https://classnotes.firebaseio.com/notes");
		$scope.notes = $firebase(notes);
		$scope.addNote = function() {
			$scope.notes.$add({ class: $scope.cl, 
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
	.controller('user', function($scope, $firebase, $window) {
		var users = new Firebase("https://classnotes.firebaseio.com/users");
		var dataRef = new Firebase("https://classnotes.firebaseio.com");
		var auth = new FirebaseSimpleLogin(dataRef, function(error, user){
			if (user){
				user_id = user.uid;
			} else {
				console.log("User is not logged in! Redirecting to main page.");
				$window.location.href = '#/main';
			}
		});
		$scope.users = $firebase(users);
		$scope.addUser = function() {
			$scope.users.$add({ birthday: $scope.bd, 
				description: $scope.de,
				email: $scope.em,
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
	.controller('signup', function($scope, $firebase, $window){
		var signup = new Firebase("https://classnotes.firebaseio.com");
		var auth = new FirebaseSimpleLogin(signup, function(error, user) {
			if (error) {
				// an error occurred while attempting login
				console.log(error);
			} else if (user) {
				// user authenticated with Firebas
        if (user.provider === "password")
        {
          // treba je naredit da pocekira, ali je user ze v bazi, sem mislil da bo đabe, sam ni, že eno+ uro to guglam pa mi ne ratuje
          //zdj dodajanje je kul, razen ce ze obstaja, pol ga pac povoz...
          var users = new Firebase("https://classnotes.firebaseio.com/users/email/"+ user.uid);
          users.set(
          {
            email: user.email,
            id: user.id
          })


        }
        else if (user.provider === "facebook")
        {
          // treba je naredit da pocekira, ali je user ze v bazi, sem mislil da bo đabe, sam ni, že eno+ uro to guglam pa mi ne ratuje
          //zdj dodajanje je kul, razen ce ze obstaja, pol ga pac povoz...
          var users = new Firebase("https://classnotes.firebaseio.com/users/facebook/"+ user.uid);
          $scope.users = $firebase(users);    
          console.log(users.child("name"));
       
          users.set({
            name: user.displayName,
          });
         
         }

        

        else if (user.provider === "google")
        {
          // treba je naredit da pocekira, ali je user ze v bazi, sem mislil da bo đabe, sam ni, že eno+ uro to guglam pa mi ne ratuje
          //zdj dodajanje je kul, razen ce ze obstaja, pol ga pac povoz...
          var users = new Firebase("https://classnotes.firebaseio.com/users/google/"+ user.uid);     
          $scope.users = $firebase(users);
  
          users.set({
            email: user.email,
            name: user.displayName
          });


        }

        else if (user.provider === "twitter")
        {
          // treba je naredit da pocekira, ali je user ze v bazi, sem mislil da bo đabe, sam ni, že eno+ uro to guglam pa mi ne ratuje
          //zdj dodajanje je kul, razen ce ze obstaja, pol ga pac povoz...
          var users = new Firebase("https://classnotes.firebaseio.com/users/twitter/"+ user.uid);     
          $scope.users = $firebase(users);
  
          users.set({
            twitterUsername: user.username,
            name: user.displayName
          });


        }


        $window.location.href = '#';


				console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
				
			} else {
				// user is logged out
			}
		}); 


		$scope.signup = function(){
			auth.createUser($scope.user.email, $scope.user.password, function(error, user) {
				if (!error) {
					console.log('User Id: ' + user.uid + ', Email: ' + user.email);
					var users = new Firebase("https://classnotes.firebaseio.com/users");
					$scope.users = $firebase(users);
					var userProperties = {
						email: $scope.user.email,
					}
					if ($scope.user.description !== undefined){
						userProperties.description = $scope.user.description;
					}else{
						userProperties.description = "";
					}
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

		$scope.signupgoogle = function(){
			auth.login('google', {
				rememberMe: true,
				scope: 'profile,email'
			});

		};

		$scope.signupfb = function(){
			auth.login('facebook', {
				rememberMe: true,
				scope: 'email,user_likes'
			});
		};


		$scope.signuptwitter = function(){
			auth.login('twitter', {
				rememberMe: true
			});
			var users = new Firebase("https://classnotes.firebaseio.com/users");
			$scope.users = $firebase(users);
			$scope.users.$add({ 
				email: auth.email,
				password: auth.uid
			});
		};
		$scope.logout = function(){
			auth.logout();
		}
	})

	.controller('login', function($scope, $firebase, $window){
		var login = new Firebase("https://classnotes.firebaseio.com");
		var auth = new FirebaseSimpleLogin(login, function(error, user) {
			if (error) {
				console.log(error);
			} else if (user) {
				user_id = user.uid;
				console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
				$window.location.href = '#';
			} else {
				console.log("user is logged out");
			}
		}); 
		$scope.loginPW = function() {
			 auth.login('password', {
				email: $scope.login.email,
				password: $scope.login.password,
				rememberMe: true
			});
			
		}
		$scope.loginFB = function() {
			auth.login('facebook', {
				rememberMe: true,
				scope: 'email,user_likes'
			});
		}
		$scope.loginGOOGLE = function(){
			auth.login('google', {
			  rememberMe: true,
			  scope: 'https://www.googleapis.com/auth/plus.login'
			});
		}
		$scope.loginTWITTER = function(){
			auth.login('twitter', {
			  rememberMe: true
			});
		}
		
	})
	.controller('navBarController', function($scope, $firebase, $firebaseSimpleLogin, $window){
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
			$window.location.href = '#';
		}
	});