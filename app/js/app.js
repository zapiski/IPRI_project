'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'main'});
  $routeProvider.when('/browse', {templateUrl: 'partials/browse.html', controller: 'browse'});
  $routeProvider.when('/user', {templateUrl: 'partials/user.html', controller: 'user'});
  $routeProvider.otherwise({redirectTo: '/main'});
}]);
