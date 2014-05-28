'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['firebase', 'ngCookies'])
	.factory('Session', function($firebase) {
    var authenticated = false;
    var userL = {};
	var userB = {};
    var ref;
    return {
        changeName: function(name)
        {
            if (authenticated)
            {
                userB.name = name;
                ref.update({name: name});


            }
        },

        changeLastName: function(lastName)
        {
            if(authenticated)
            {
                userB.lastName = lastName;
                ref.update({lastName:  lastName});
            }
        },

        changeBirthday: function(birthday)
        {

            if (authenticated)
            {
                userB.birthday = birthday;
                ref.update({birthday: birthday});
            }
        },
        changeSchool: function(school)
        {
            userB.school = school;
            ref.update({school: school});
        },

        changeEmail: function(email)
        {
            userB.email = email;
            ref.update({email: email});
        },    
        isAuthenticated: function () {
            return authenticated;
        },

        setAuthenticated: function(auth)
        {
            authenticated = auth;
        },

        getUserL: function() {
            return userL;
        },
        getUserEmail: function()
        {
            return userL.email;
        },
		getUserB: function() {
            return userB;
        },
        login: function(user) {
			userL = user;
            ref =  new Firebase("https://classnotes.firebaseio.com/users/" + user.uid);				
            userB = $firebase(ref);
			authenticated = true;
        }
    }
	});
