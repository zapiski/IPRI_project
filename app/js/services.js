'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['firebase'])
	.factory('Session', function($firebase) {
    var authenticated = false;
    var userL = {};
	var userB = {};
    return {
        isAuthenticated: function () {
            return authenticated;
        },
        getUserL: function() {
            return userL;
        },
		getUserB: function() {
            return userB;
        },
        login: function(user) {
			userL = user;
            var ref =  new Firebase("https://classnotes.firebaseio.com/users/" + user.uid);				
            userB = $firebase(ref);
			authenticated = true;
        }
    }
	});
