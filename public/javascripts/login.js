(function () {
    'usestrict';
"the initialize angular module"
    angular.module("myAdmin",[]).controller('loginCtrl', function($scope, $http){
        $scope.login = function() {
            $http.post('/admin/',{useremail:$scope.userEmail, userpassword:$scope.userPassword}).
                then(function(response) {
                console.log("posted successfully");
                window.location.href="/admin/home";
            }).catch(function(response) {
                console.error("error in posting");
            })
        }   
    }
)
}) // <- theses bracket and parenthesis are missing
();