ModifiQAppController.controller('loginController', function($scope, webRequest, localService, alerta, sessionService, $timeout, $rootScope, $interval, $location, loading){
    $scope.form = {
    	email: '',
    	senha: '',
        lembrar: false
    }
    $scope.showButton = true;
    $scope.submit = function(){
    	if($scope.form.email == ''){
    		alerta.show('warning', 'Atenção', 'Preencha o campo E-mail corretamente!');
    	}else if($scope.form.senha == ''){
    		alerta.show('warning', 'Atenção', 'Preencha o campo Senha corretamente!');
    	}else{
    		$scope.showButton = false;
            loading.show();
            webRequest.post("aluno/login", $scope.form, function(res){
                loading.hide();
                if(res.data.data.arquivo != null){
                    res.data.data.arquivo = $rootScope.urlApi+'/api/geral/arquivo/'+res.data.data.arquivo+'/ver';
                }else{
                    res.data.data.arquivo = '/images/default/user.png';
                }
                sessionService.set("usuario", res.data.data);
                if($scope.form.lembrar){
                    localService.set("usuario", res.data.data);
                }
                $rootScope.$broadcast("login");
                $location.path("/dashboard");
            }, function(err){
                loading.hide();
                alerta.show('warning', 'Atenção', err.data.mensagem);
                $scope.showButton = true;
            });
    	}
    }
    $scope.cadastro = function(){
        $location.path("/cadastro/1");
    }
});