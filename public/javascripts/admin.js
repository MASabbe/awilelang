(function () {	
	'usestrict';

	var admin = angular.module("myAdmin", ["ngRoute"]);

	admin.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
		$routeProvider.when('/admin/', {
			templateUrl: "/admin/index.html";
		})
	}]);

})();
