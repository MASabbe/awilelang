(function () {
    'usestrict';
"the initialize angular module"
    angular.module("myAdmin",[]).controller('loginCtrl', function($scope, $http){
        $scope.login = function() {
        	var userEmail = $scope.user.email;
        	var userPassword = $scope.user.password;

            $http.post('/admin/',{useremail:userEmail, userpassword:userPassword}, function(res) {
            	if (res==='fail') {
            		
            	}
            });   
        }   
    })
})();