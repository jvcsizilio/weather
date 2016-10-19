app.service('weatherService', function($http) {
	
	var key = '23fea3e87df687ef5344583f5814353b';
    var baseUrl = '//api.openweathermap.org/data/2.5/weather?units=metric&APPID=' + key;

    this.getWeatherByCoordinates = function(params, successCallback, errorCallback) {
    	var header = {
            method: 'GET',
            url: baseUrl + '&lat=' + params.lat + '&lon=' + params.lon
        }

        $http(header).then(function onSuccess(res) {            
            var weather = buildWeather(res.data);
            if (successCallback) successCallback(weather);

        }, function onError(res) {
            console.error(res);
            if (errorCallback) errorCallback(res);

        });
    }

    this.getWeatherByZip = function(params, successCallback, errorCallback) {
        var zip = (params.country) ? params.zip + ',' + params.country : params.zip;
        var header = {
            method: 'GET',
            url: baseUrl + '&zip=' + zip
        }

        $http(header).then(function onSuccess(res) {            
            var weather = buildWeather(res.data);
            if (successCallback) successCallback(weather);

        }, function onError(res) {
            console.error(res);
            if (errorCallback) errorCallback(res);

        });
    }

    this.getWeatherCityName = function(params, successCallback, errorCallback) {
        var city = (params.country) ? params.city + ',' + params.country : params.city;
        var header = {
            method: 'GET',
            url: baseUrl + '&q=' + city,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }

        $http(header).then(function onSuccess(res) {            
            var weather = buildWeather(res.data);
            if (successCallback) successCallback(weather);

        }, function onError(res) {
            console.error(res);
            if (errorCallback) errorCallback(res);

        });
    }


    function buildWeather(data) {
    	return new Weather(data.name, 
                           data.sys.country, 
                           data.coord.lat, 
                           data.coord.lon, 
                           data.main.temp, 
                           data.main.humidity,
                           data.wind.speed * 3.6,
                           'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    }

});