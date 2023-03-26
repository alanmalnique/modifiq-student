var ModifiQApp = angular.module('ModifiQApp', ['ModifiQApp.controllers', 'ModifiQApp.services', 'ngRoute', 'oitozero.ngSweetAlert']),
    ModifiQApiVersion = '1.0.0',
    ModifiQApiUrl = "http://127.0.0.1:8000",
    ModifiqAulaUrl = "http://127.0.0.1:8080",
    ModifiqBackofficeUrl = "";

ModifiQApp.run(function($rootScope, $http, webRequest, localService, $interval, $location) {
    $rootScope.urlApi = ModifiQApiUrl;
    $rootScope.urlBackoffice = ModifiqBackofficeUrl;
    $rootScope.pagina = '';
});

ModifiQApp.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.withCredentials = true;
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
	$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	$httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
	$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Api-Version, Accept, Authorization';
}]);
