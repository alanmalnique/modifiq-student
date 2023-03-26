ModifiQAppController.controller('mensalidadeController', function($scope, webRequest, localService, sessionService, $timeout, $rootScope, $interval, $location, loading, creditCard, alerta){
    $rootScope.pagina = 'mensalidade';
    $scope.usuario = sessionService.get("usuario");
    var data = new Date();
    $scope.ano = data.getFullYear();
    $scope.mes = data.getMonth() + 1;
    $scope.mensalidade = {}
    $scope.maximo_cvv = 3;
    $scope.cartao = {
        numero: '',
        mes: '',
        ano: '',
        cvv: '',
        bandeira: '',
        titular: ''
    }
    $scope.carregaMensalidade = function(){
        loading.show();
        webRequest.get("aluno/mensalidade", {}, function(ok){
            loading.hide();
            $scope.mensalidade = ok.data;
            var vencimento = $scope.mensalidade.dtvencimento.split("-");
            $scope.mesvencimento = vencimento[1];
        });
    }
    $scope.carregaMensalidade();
    $scope.changeMaxCVV = function(){
        $scope.cartao.cvv = '';
        if($scope.cartao.bandeira == 5){
            $scope.maxCVV = 4;
        }else{
            $scope.maxCVV = 3;
        }
    }
    $scope.mascara_cartao = '9999 9999 9999 9999';
    $scope.validaBin = function(){
        $scope.cartao.numeroLimpo = $scope.cartao.numero.replace(/\s/g, "");
        var creditCardFlag = creditCard.ObterNome($scope.cartao.numeroLimpo.substring(0, 6));
        console.log(creditCardFlag);
        if(creditCardFlag == 5){
            $scope.mascara_cartao = '9999 999999 99999';
        }else if(creditCardFlag == 3){
            $scope.mascara_cartao = '9999 999999 9999';
        }else{
            $scope.mascara_cartao = '9999 9999 9999 9999';
        }
        $scope.cartao.bandeira = creditCardFlag;
        mascaraTipos();
        $scope.changeMaxCVV();
    }
    $scope.validaBin();
    $scope.enviarPagamento = function(){
        if($scope.cartao.numero == ''){
            alerta.show('warning', "Atenção", "Preencha corretamente o campo 'Número' para continuar!");
        }else if($scope.cartao.bandeira == ''){
            alerta.show('warning', "Atenção", "Não conseguimos identificar a bandeira do seu cartão. Verifique se ela está em nossa lista de bandeiras aceitas.");
        }else if($scope.cartao.mes == ''){
            alerta.show('warning', "Atenção", "Preencha corretamente o campo 'Mês' para continuar!");
        }else if($scope.cartao.ano == ''){
            alerta.show('warning', "Atenção", "Preencha corretamente o campo 'Ano' para continuar!");
        }else if($scope.cartao.cvv == ''){
            alerta.show('warning', "Atenção", "Preencha corretamente o campo 'CVV' para continuar!");
        }else if($scope.cartao.titular == ''){
            alerta.show('warning', "Atenção", "Preencha corretamente o campo 'Titular' para continuar!");
        }else{
            loading.show();
            webRequest.post('aluno/pagamento', $scope.cartao, function(cartaoReturn){
                loading.hide();
                if(cartaoReturn.data.erro){
                    alerta.show('warning', "Atenção", "Ocorreu um erro ao tentar realizar o pagamento: "+cartaoReturn.data.mensagem);
                }else{
                    alerta.show('success', "Sucesso", "O pagamento da mensalidade foi realizado com sucesso!", function(ok){
                        if(ok){
                            $location.path("/dashboard");
                        }
                    })
                }
            });
        }
    }
});