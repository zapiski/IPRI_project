'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
.factory('Class', ['$resource',
  function($resource){
    return $resource('JSON/classes.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }])
.factory('Note', ['$resource',
  function($resource){
    return $resource('JSON/notes.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }])
.factory('User', ['$resource',
  function($resource){
    return $resource('JSON/users.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
