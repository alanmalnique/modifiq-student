ModifiQAppController.controller('regulamentoController', function($scope, webRequest, localService, $timeout, $rootScope, $interval, $location, loading){
    $rootScope.pagina = 'regulamento';
    loading.show();
	webRequest.get("geral/institucional/listar/3", $scope.contato, function(ok){
		loading.hide();
		$scope.institucional = ok.data.data;
	}, function(err){
		loading.hide();
	})
});