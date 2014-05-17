'use strict';
var isLoggedIn =  false;

/* Controllers */

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
  .controller('user', function($scope, $firebase) {
 var users = new Firebase("https://classnotes.firebaseio.com/users");
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
  .controller('signup', function($scope, $firebase){
 var signup = new Firebase("https://classnotes.firebaseio.com");
 var auth = new FirebaseSimpleLogin(signup, function(error, user) {
  if (error) {
   // an error occurred while attempting login
   console.log(error);
    } else if (user) {
   // user authenticated with Firebase
   if (user.provider === "facebook")
   {
      var users = new Firebase("https://classnotes.firebaseio.com/users");
    $scope.users = $firebase(users);
        $scope.users.$add({ 
         accessToken: user.accessToken,
         userid: user.uid});

   }

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
        $scope.users.$add({ 
         email: $scope.user.email,
         password: $scope.user.password
       });
 

    }
  });
 };

 $scope.signupgoogle = function()
 {
    auth.login('google', {
      rememberMe: true,
      scope: 'https://www.googleapis.com/auth/plus.login'
  });
      var users = new Firebase("https://classnotes.firebaseio.com/users");
    $scope.users = $firebase(users);
        $scope.users.$add({ 
         email: $scope.auth.email,
         password: $scope.auth.uid
       });
 

 };


  $scope.signupfb = function()
 {
  auth.login('facebook', {
  rememberMe: true,
  scope: 'email,user_likes'
});

          
 };


    $scope.signuptwitter = function()
 {
auth.login('twitter', {
  rememberMe: true
});
 
var users = new Firebase("https://classnotes.firebaseio.com/users");
    $scope.users = $firebase(users);
        $scope.users.$add({ 
         email: $scope.auth.email,
         password: $scope.auth.uid
       });


 };

 $scope.logout = function()
 {

  auth.logout();
  isLoggedIn = false;
 }

  })

.controller('login', function($scope, $firebase){
 var login = new Firebase("https://classnotes.firebaseio.com");
 var auth = new FirebaseSimpleLogin(login, function(error, user) {
  if (error) {
        console.log("ERROR")
     console.log(error);
    } else if (user) {
      isLoggedIn = true;
     console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
    } else {
        console.log("user is logged out");
    }
 }); 
   $scope.loginPW = function() {
    console.log($scope.login.email);
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


  })
 .controller('navBarController', function($scope, $firebase){
 $scope.isUserLoggedIn = isLoggedIn;
  });