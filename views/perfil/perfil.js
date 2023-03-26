ModifiQAppController.controller('perfilController', function($scope, webRequest, localService, sessionService, alerta, $timeout, $rootScope, $interval, $location, loading){
    $rootScope.pagina = 'perfil';
    $scope.perfil = {};
    $scope.simnao = {
        0: 'Não',
        1: 'Sim'
    }
    $scope.showButton = true;
    loading.show();
    webRequest.get("aluno/perfil", {}, function(ok){
    	loading.hide();
    	$scope.perfil = ok.data.data;
    	$scope.perfil.dtnascimento = $scope.perfil.dtnascimento.split("-");
    	$scope.perfil.dtnascimento = $scope.perfil.dtnascimento[2]+'/'+$scope.perfil.dtnascimento[1]+'/'+$scope.perfil.dtnascimento[0];
    	console.log($scope.perfil);
    }, function(err){
    	$location.path("/logout");
    });
    $scope.salvar = function(){
        loading.show();
        $scope.showButton = false;
        console.log($scope.perfil);
        webRequest.put("aluno/perfil", $scope.perfil, function(ok){
            $scope.showButton = true;
            loading.hide();
            alerta.show('success', 'Sucesso :)', 'Seu perfil foi atualizado com sucesso!', false, function(){
                $location.path("/dashboard");
            });
        }, function(err){
            $scope.showButton = true;
            alert(err.data.mensagem);
        });
    }
});