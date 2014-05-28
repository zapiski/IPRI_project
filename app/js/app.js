'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'myApp.animations',

  'lr.upload',
  'angularFileUpload'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main/', {templateUrl: 'partials/main.html', controller: 'main'});
  $routeProvider.when('/browse/', {templateUrl: 'partials/browse.html', controller: 'browse'});
  $routeProvider.when('/user/', {templateUrl: 'partials/user.html', controller: 'user'});
  $routeProvider.when('/signup/', {templateUrl: 'partials/signup.html', controller: 'signup'});
  $routeProvider.when('/login/', {templateUrl: 'partials/login.html', controller: 'login'});
  $routeProvider.when('/uploadNote/', {templateUrl: 'partials/newnote.html', controller: 'uploadNote'});
  $routeProvider.when('/uploadNote/:uniName', {templateUrl: 'partials/newnote.html', controller: 'uploadNoteUni'});
  $routeProvider.when('/uploadNote/:uniName/:facultyName', {templateUrl: 'partials/newnote.html', controller: 'uploadNoteFaculty'});
  $routeProvider.when('/uploadNote/:uniName/:facultyName/:className', {templateUrl: 'partials/newnote.html', controller: 'uploadNoteClass'});
  $routeProvider.otherwise({redirectTo: '/main/'});
}]);
