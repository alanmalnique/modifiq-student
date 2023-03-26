ModifiQAppController.controller('registroEvolutivoController', function($scope, alerta, webRequest, sessionService, localService, $timeout, $rootScope, $interval, $location, loading){
    $rootScope.pagina = 'registro-evolutivo';
    $scope.usuario = sessionService.get("usuario");
    $scope.paginacao = {
    	per_page: 10,
    	page: 1
    }
    $scope.upload = {
        titulo: '',
        descricao: ''
    }
    $scope.registros = [];
    $scope.total = 0;
    $scope.carregaRegistros = function(page){
    	loading.show();
    	webRequest.get("aluno/registroevolutivo", $scope.paginacao, function(ok){
    		for(var i = 0; i < ok.data.data.length; i++){
    			$scope.registros.push(ok.data.data[i]);
    		}
    		$scope.total = ok.data.total;
    		loading.hide();
    	})
    }
    $scope.carregaRegistros(1);
    $scope.verMais = function(){
        $scope.paginacao.page += 1;
        $scope.carregaRegistros($scope.paginacao.page);
    }
    $scope.enviar = function(){
        if($scope.upload.titulo == ''){
            alerta.show('warning', 'Atenção', 'Preencha o campo título corretamente!');
            return false;
        }
        loading.show();
        var formData = new FormData();
        var file = $("#arquivo")[0];
        console.log(file.files[0]);
        formData.append('arquivo', file.files[0]);
        formData.append('descricao', $scope.upload.descricao);
        $scope.upload.descricao = '';
        webRequest.upload("aluno/registroevolutivo", formData, function(ok){
            loading.hide();
            $('#modalUpload').modal('toggle');
            $scope.registros = [];
            loading.show();
            $timeout(function(){
                $scope.carregaRegistros();
            }, 500);
        }, function(err){
            loading.hide();
            $('#modalUpload').modal('toggle');
            alerta.show("warning", "Ops :(", "Não foi possível realizar o upload da foto!");
        });
    }
});