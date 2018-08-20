(function () {
    'usestrict';
    //the initialize angular module

    angular.module('myAdmin',['firebase'])
    .value('databaseURL', "https://awirealtimelelang.firebaseio.com")
    .factory('firebaseRef', function ($firebase, databaseURL) {
        return new Firebase(databaseURL);
    })
    .controller('loginCtrl', function($scope, $http){
        $scope.login = function() {
        	var userEmail = $scope.user.email;
        	var userPassword = $scope.user.password;

            firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
            .then(firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    
                } else {
                    // No user is signed in.
                }
            });
            )
            .catch(function(error){
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(error.code);
                console.log("Error while executing angular controller "+error.message);
                // ...
            });
        }   
    })
})();