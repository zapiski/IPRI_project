'use strict';

/* Controllers */
var user_id;
angular.module('myApp.controllers', [])
	.controller('main', function($scope, Session, $firebase, $cookieStore) {
		$scope.auth = $cookieStore.get('loggedIn');
		$scope.userL = Session.getUserL();
		$scope.userB = Session.getUserB();

		
	
	
		var classes = new Firebase("https://classnotes.firebaseio.com/classes");
		$scope.classes = $firebase(classes);
	})
	.controller('browse', function($scope, Session, $firebase, $cookieStore) {
		$scope.auth = $cookieStore.get('loggedIn');
		$scope.userL = Session.getUserL();
		$scope.userB = Session.getUserB();
	
		var notes = new Firebase("https://classnotes.firebaseio.com/notes");
		$scope.notes = $firebase(notes);
	})
	.controller('browseFaculties', function($scope, Session, $firebase, $cookieStore, $routeParams, $location) {
					
					$scope.go = function (first,second) {
						console.log(first);
						console.log(second);
						var path = "/browseClasses/" + first + "/" + second;
						console.log(path);
  						$location.path( path );
					};

			$scope.currentUni = $routeParams.uniName;
			var faculties = new Firebase("https://classnotes.firebaseio.com/Universities/children/" + $routeParams.uniName + "/children/");	
			$scope.faculties = $firebase(faculties);




	})
	.controller('browseClasses', function($scope, Session, $firebase, $cookieStore, $routeParams, $location) {

				$scope.go = function (first,second,third) {
						var path = "/browseNotes/" + first + "/" + second + "/" + third;
						console.log(path);
  						$location.path( path );
					};

			$scope.currentUni = $routeParams.uniName;
			$scope.currentFaculty = $routeParams.facultyName;
			var classes = new Firebase("https://classnotes.firebaseio.com/Universities/children/" + $routeParams.uniName + "/children/" + $routeParams.facultyName + "/children");	
			$scope.classes = $firebase(classes);



	})
	.controller('browseNotes', function($scope, Session, $firebase, $cookieStore, $routeParams, $location) {
		$scope.currentUni = $routeParams.uniName;
		$scope.currentFaculty = $routeParams.facultyName;
		$scope.currentClass = $routeParams.className;	
		console.log($routeParams.className);
		console.log("pridem sm");
		var notes = new Firebase("https://classnotes.firebaseio.com/Universities/children/" + $routeParams.uniName + "/children/" + $routeParams.facultyName + "/children/" + $routeParams.className + "/children");
		$scope.notes = $firebase(notes);
		console.log($scope.notes);

	})
	.controller('sideBarController', function($scope, Session, $firebase, $cookieStore)
	{
		var unis = new Firebase("https://classnotes.firebaseio.com/Universities/children");
		$scope.unis = $firebase(unis);

	})
	.controller('uploadNote', function($scope, Session, $firebase, $cookieStore, $routeParams)
	{
		var universities = new Firebase("https://classnotes.firebaseio.com/Universities/children/");
		$scope.universities = $firebase(universities);
		console.log($scope.universities);
	
	})
	.controller('uploadNoteUni', function($scope, Session, $firebase, $cookieStore, $routeParams)
	{


			$scope.currentUni = $routeParams.uniName;

			var faculties = new Firebase("https://classnotes.firebaseio.com/Universities/children/" + $routeParams.uniName + "/children/");	
			$scope.faculties = $firebase(faculties);
	

	})
    .controller('uploadNoteFaculty', function($scope, Session, $firebase, $cookieStore, $routeParams)
	{
		var universities = new Firebase("https://classnotes.firebaseio.com/Universities/children/");
		$scope.universities = $firebase(universities);

		    
			var faculties = new Firebase("https://classnotes.firebaseio.com/Universities/children/" + $routeParams.uniName + "/children/");	
			$scope.faculties = $firebase(faculties);

			$scope.currentUni = $routeParams.uniName;
			$scope.currentFaculty = $routeParams.facultyName;
			var classes = new Firebase("https://classnotes.firebaseio.com/Universities/children/" + $routeParams.uniName + "/children/" + $routeParams.facultyName + "/children");	
			$scope.classes = $firebase(classes);

		
	})
	 .controller('uploadNoteClass', function($scope, Session, $firebase, $cookieStore, $routeParams, $upload)
	{

		var universities = new Firebase("https://classnotes.firebaseio.com/Universities/children/");
		$scope.universities = $firebase(universities);
		    
			var faculties = new Firebase("https://classnotes.firebaseio.com/Universities/children/" + $routeParams.uniName + "/children/");	
			$scope.faculties = $firebase(faculties);

			var classes = new Firebase("https://classnotes.firebaseio.com/Universities/children/" + $routeParams.uniName + "/children/" + $routeParams.facultyName + "/children");	
			$scope.classes = $firebase(classes);
			$scope.currentUni = $routeParams.uniName;
			$scope.currentFaculty = $routeParams.facultyName;
			$scope.currentClass = $routeParams.className;
			var noteLocation = new Firebase("https://classnotes.firebaseio.com/Universities/children/" + $routeParams.uniName + "/children/" + $routeParams.facultyName + "/children/" + $routeParams.className + "/children");	
			$scope.noteLocation = $firebase(noteLocation)

			

			$scope.uploadNote = function()
			{
			var note = {
					"name": $scope.newnote.name,
					"description": $scope.newnote.description,
					"year": $scope.newnote.year,
					"noteURL": "files/"+ $scope.newnote.name,
				}
				console.log("haha")
			$scope.noteLocation.$add(note);

			}

			$scope.onFileSelect = function($files) {
			//$files: an array of files selected, each file has name, size, and type.
			for (var i = 0; i < $files.length; i++) {
			  var file = $files[i];
			  $scope.upload = $upload.upload({
				url: 'files/', //upload.php script, node.js route, or servlet url
				method: 'POST',
				// method: 'POST' or 'PUT',
				// headers: {'header-key': 'header-value'},
				// withCredentials: true,
				data: {myObj: $scope.myModelObj},
				file: file, // or list of files: $files for html5 only
				/* set the file formData name ('Content-Desposition'). Default is 'file' */
				//fileFormDataName: myFile, //or a list of names for multiple files (html5).
				/* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
				//formDataAppender: function(formData, key, val){}
			  }).progress(function(evt) {
				 console.log(file);
				console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			  }).success(function(data, status, headers, config) {
				// file is uploaded successfully
				console.log(data);
			  });
			  //.error(...)
			  //.then(success, error, progress); 
			  //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
			}
			/* alternative way of uploading, send the file binary with the file's content-type.
			   Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
			   It could also be used to monitor the progress of a normal http post/put request with large data*/
			// $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
		  };

				

		
	})
	.controller('user', function($scope, Session, $firebase, $window, $cookieStore) {
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
				$window.location.href='#/main/'
			}
		});

		$scope.changeName = function(name)
		{
			name = prompt("Please enter your name")
			Session.changeName(name);
		};

		$scope.changeLastName = function(lastName)
		{
			lastName = prompt("Please enter your last name")
			Session.changeLastName(lastName);
		};

		$scope.changeBirthday = function(birthday)
		{
			birthday = prompt("Please enter your birthday")
			Session.changeBirthday(birthday);
		};
		$scope.changeSchool = function(school)
		{
			school = prompt("Please enter your school")
			Session.changeSchool(school);
		};
	})
	.controller('signup', function($scope, Session, $firebase, $window, $cookieStore){
		var ref = new Firebase("https://classnotes.firebaseio.com");
		var auth = new FirebaseSimpleLogin(ref, function(error, user) {
			if (error) {
				// an error occurred while attempting login
				console.log(error);
			} else if (user) {
				$window.location.href = '#/main/';
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
					$cookieStore.put('loggedIn', true);
				}else{
					console.log(error);
					alert("There was an error creating a user! The email is probably already in use!");
				}
			});
		};

	})
	.controller('uploadController', function($scope, $upload)
	{
		 
	})
	.controller('login', function($scope, Session, $firebase, $window, $cookieStore){
		var login = new Firebase("https://classnotes.firebaseio.com");
		var users = new Firebase("https://classnotes.firebaseio.com/users");
		$scope.users = $firebase(users);

		var auth = new FirebaseSimpleLogin(login, function(error, user) {
			if (error) {
				console.log(error);
			} else if (user) {
				user_id = user.uid;
				Session.login(user); //dodamo userja
				$window.location.href = '#/main/';
				if (user.provider === "facebook")
				{
					if (typeof $scope.users[user.uid] === "undefined" )
					{
					$scope.users[user.uid] = user;
					$scope.users.$save(user.uid);
					Session.changeName(user.thirdPartyUserData.first_name);
					Session.changeLastName(user.thirdPartyUserData.last_name);
					Session.changeEmail(user.thirdPartyUserData.email);
					}
				}

				else if (user.provider === "google")
				{
					if (typeof $scope.users[user.uid] === "undefined" )
					{
					$scope.users[user.uid] = user;
					$scope.users.$save(user.uid);
					Session.changeName(user.thirdPartyUserData.given_name);
					Session.changeLastName(user.thirdPartyUserData.family_name);
					Session.changeEmail(user.thirdPartyUserData.email);
					}

				}

				else if (user.provider === "twitter")
				{
					if (typeof $scope.users[user.uid] === "undefined" )
					{
					$scope.users[user.uid] = user;
					$scope.users.$save(user.uid);
					Session.changeName(user.thirdPartyUserData.first_name);
					}

				}
			
			} else {
				console.log("User is logged out!");
			}
		}); 
		$scope.loginPW = function() {
			auth.login('password', {
				email: $scope.login.email,
				password: $scope.login.password,
			});
			$cookieStore.put('loggedIn', true);
			
		}
		$scope.loginFB = function() {
			auth.login('facebook', {
				scope: 'email,user_likes'
			});
			$cookieStore.put('loggedIn', true);
		}
		$scope.loginGOOGLE = function(){
			auth.login('google', {
			  scope: 'https://www.googleapis.com/auth/plus.login'
			});
			$cookieStore.put('loggedIn', true);
		}
		$scope.loginTWITTER = function(){
			auth.login('twitter', {
			});
			$cookieStore.put('loggedIn', true);
		}
		
	})
	.controller('navBarController', function($scope, Session, $firebase, $window, $cookieStore){
		$scope.$watch(Session.isAuthenticated, function() {
			$scope.auth = $cookieStore.get('loggedIn');
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
			Session.setAuthenticated(false);
			$window.location.href = '#/main/';
			$cookieStore.put('loggedIn', false);
		}
	});