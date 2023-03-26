ModifiQAppController.controller('contatoController', function($scope, alerta, webRequest, localService, sessionService, $timeout, $rootScope, $interval, $location, loading){
    $rootScope.pagina = 'contato';
    $scope.usuario = sessionService.get("usuario");
    $scope.contato = {
    	nome: $scope.usuario.nome,
    	email: '',
    	celular: '',
    	assunto: '',
    	mensagem: ''
    }
    $scope.enviar = function(){
    	if($scope.contato.nome == ''){
    		alerta.show('warning', 'Atenção', 'Preencha o campo nome corretamente!');
    		return;
    	}else if($scope.contato.email == ''){
    		alerta.show('warning', 'Atenção', 'Preencha o campo email corretamente!');
    		return;
    	}else if($scope.contato.celular == ''){
    		alerta.show('warning', 'Atenção', 'Preencha o campo celular corretamente!');
    		return;
    	}else if($scope.contato.assunto == ''){
    		alerta.show('warning', 'Atenção', 'Preencha o campo assunto corretamente!');
    		return;
    	}else if($scope.contato.mensagem == ''){
    		alerta.show('warning', 'Atenção', 'Preencha o campo mensagem corretamente!');
    		return;
    	}else{
    		loading.show();
    		webRequest.post("geral/faleconosco", $scope.contato, function(ok){
    			loading.hide();
    			alerta.show('success', 'Contato enviado :)', 'Sua mensagem de contato foi enviada e em breve entraremos em contato!', false, function(){
    				$location.path("/dashboard");
    			});
    		}, function(err){
    			loading.hide();
    			alerta.show('warning', 'Ops!', 'Ocorreu um erro ao enviar o seu contato: '+err.data.mensagem);
    		})
    	}
    }
});