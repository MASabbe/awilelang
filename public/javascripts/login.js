(function () {
    'usestrict';
"the initialize angular module"
    angular.module("myAdmin",['firebase']).controller('loginCtrl', function($scope, $http){
        $scope.login = function() {
        	var userEmail = $scope.user.email;
        	var userPassword = $scope.user.password;
            var myObject = {useremail:userEmail, userpassword:userPassword}

            firebase.auth().signInWithEmailAndPassword(myObject)
            .then(firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var providerData = user.providerData;
                }

                $http({
                method: 'POST',
                url   : '/admin/',
                data  : JSON.stringify(uid)
                })
            })
            .catch(function(error) {
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