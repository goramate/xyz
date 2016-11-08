angular.module("homeApp")
.constant("authUrl", "http://127.0.0.1/silex/web/api_login_check")
.constant("ordersUrl", "http://127.0.0.1/crm2/api/")
.controller("authCtrl", function($scope, $http, $location, authUrl) {

	
    $scope.authenticate = function (user, pass) {
        $http.post(authUrl,
				"_username="+user+ "&_password=" +pass,
				{ headers: {'Content-Type': 'application/x-www-form-urlencoded'}  }
				).then( function(data) {
						window.alert("Zalogowałeś się " + data.data);
						$scope.authenticationError = null;
						$scope.response = data.data;
						$location.path("/main");
					},
				function(error) 
        {
			window.alert("Błąd:\n" + error.data );
            $scope.authenticationError = error;
			
        });
		
    }
	
	$scope.test = function () {
        $http.get("http://127.0.0.1/silex/web/api_wer",
				"",
				{  }
				).then( function(data) {	
						$location.path("/login");
						$scope.authenticationError = null;
						$scope.response = data.data;
					},
				function(error) 
        {
			window.alert("Błąd:\n" + error.data );
            $scope.authenticationError = error;
			
        });
		
    }
	
	
	$scope.logout = function () {
        $http.get("http://127.0.0.1/silex/web/api_logout",
				"",
				{  }
				).then( function(data) {
						window.alert("Wylogowałeś się\n" + data);
						$location.path("/login");
					},
				function(error) 
        {
			window.alert("Błąd:\n" + error );
            $scope.authenticationError = error;
			
        });
		
    }
	
});