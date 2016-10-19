(function (angular) {
    //'use strict';

app.controller('indexController', function($scope, $timeout){
    
    $scope.weather = new Weather();
    $scope.show = false;


    function start() {
   		if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(buildLocation, showError);
	    } else {
	        alert("Geolocation is not supported by this browser.");
	        $scope.show = true;
	    }
	}
	function buildLocation(position) {
	    $scope.weather.lat = position.coords.latitude;
	    $scope.weather.lon = position.coords.longitude;
	    $scope.show = true;
	    $scope.$apply();
	}
	function showError(error) {
	  	switch(error.code) {
		    case error.PERMISSION_DENIED:
		      alert("User denied the request for Geolocation.");
		      break;
		    case error.POSITION_UNAVAILABLE:
		      alert("Location information is unavailable.");
		      break;
		    case error.TIMEOUT:
		      alert("The request to get user location timed out.");
		      break;
		    case error.UNKNOWN_ERROR:
		      alert("An unknown error occurred.");
		      break;
	    }

	    $scope.show = true;
	    $scope.$apply();
  	}
	
	start();
    
});

})(window.angular);