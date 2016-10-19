(function (angular) {
    //'use strict';
        
angular.module("task1").directive('weatherBox', function($http, weatherService) {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/task/html/directives/weather-box.html',
        scope: {
            weather: '=?'
        },
        controller: function($scope) {
            $scope.showWeather = false;
            $scope.icon = '';
            $scope.searchType = '';

            $scope.clear = clear;
            $scope.setSearchType = setSearchType;
            $scope.search = search;



            function start() {
                if ($scope.weather.lat) {
                    getByCoordinates();
                }    
            }

            function setSearchType(type) {
                $scope.searchType = type;
            }

            function search() {
                switch ($scope.searchType) {
                    case 'country':
                        getByCityName();
                        break;
                        
                    case 'zip':
                        getWeatherByZip();
                        break;   
                    
                    case 'coordinates':
                        getByCoordinates();
                        break;
                }
            }

            function clear() {
                $scope.showWeather = false;
                $scope.icon = '';
                $scope.searchType = '';
                $scope.weather = {};
            }            
            function getByCityName() {
                weatherService.getWeatherCityName($scope.weather, defaultCallback);
            }
            
            function getWeatherByZip() {
                weatherService.getWeatherByCoordinates($scope.weather, defaultCallback);
            }
            function getByCoordinates() {
                weatherService.getWeatherByCoordinates($scope.weather, defaultCallback);
            }
            function defaultCallback(weather) {
                $scope.weather = weather;
                $scope.showWeather = true;
            }
            
            start();
            
        }
    }; 
});

})(window.angular);
