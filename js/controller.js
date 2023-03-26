var ModifiQAppController = angular.module('ModifiQApp.controllers', []);

ModifiQAppController.controller('indexController', function($scope, $location, webRequest, alerta, localService, sessionService, $timeout, $rootScope, $interval){
    $scope.logout = function(){
        alerta.show('warning', 'Atenção', 'Deseja realmente efetuar o logout?', true, function(){
            sessionService.destroy("usuario");
            localService.destroy("usuario");
            $location.path("/");
        });
    }
    $rootScope.collapse = function(){
    	var vw = $(window)[0].innerWidth;
        $(".pcoded-main-container").toggleClass("pcoded-main-container-collapsed");
        if (vw < 991) {
            console.log('menor');
            $(".pcoded-navbar").toggleClass("navbar-collapsed mob-open");
        }else{
            console.log('maior');
            $(".pcoded-navbar").toggleClass("navbar-collapsed");
        }
    }
    $rootScope.usuario = {};
    $rootScope.aula = false;
    $rootScope.$on("login",function(){
        $rootScope.usuario = sessionService.get("usuario");
        $rootScope.loginToken = $scope.usuario.token;
        carregaAula();
    });
    var localData = localService.get("usuario");
    var sessionData = sessionService.get("usuario");
    if(localData || sessionData){
        if(localData && !sessionData){
            sessionService.set("usuario", localData);
        }
        $rootScope.$broadcast("login");
        if($location.url() == ""){
            $location.path("/dashboard");
        }
    }

    function carregaAula(){
        var usuario = sessionService.get("usuario");
        if(usuario != undefined){
            var date = new Date();
            var horas = date.getHours();
            var minutos = date.getMinutes();
            var horario = usuario.horario_aula.split(":");
            var horas_aluno = horario[0];
            var minutos_aluno = horario[1];
            if(horas >= horas_aluno && minutos >= minutos_aluno){
                $rootScope.aula = true;
            }
        }
    }
    var intervalo = $interval(carregaAula, 500000);
    carregaAula();
    $rootScope.acessarAula = function(){
        var usuario = sessionService.get("usuario");
        var url = ModifiqAulaUrl + '/#!/home/2/'+usuario.id;
        window.open(url, '_blank');
    }
});

ModifiQAppController.controller('menuController', function($scope, $location, webRequest, localService, sessionService, $timeout, $rootScope, $interval){
    $rootScope.usuario = {};
    $scope.$watch("login",function(){
        $rootScope.usuario = sessionService.get("usuario");
    });
    $scope.enviarMensagem = function(){
        var whatsapp = $rootScope.usuario.professor.whatsapp.replace("(", "").replace(")", "").replace(" ", "").replace("-", "");
        var url = 'https://api.whatsapp.com/send/?phone=55'+whatsapp+'&text&app_absent=0';
        window.open(url, '_blank');
    }
});