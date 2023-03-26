ModifiQAppController.controller('agendaController', function($scope, $sce, webRequest, localService, $timeout, $rootScope, $interval, $location, loading){
    $rootScope.pagina = 'agenda';
    $scope.meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    $scope.horarios = [];
    // Pega as datas para a agente
    var date = new Date();
    var dias_mes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    var dias_mes_anterior = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    var first_date = new Date(date.getFullYear(), date.getMonth(), 1);
    var mes_anterior = new Date(date);
	mes_anterior.setMonth(date.getMonth()-1);
	var primeiro_dia = first_date.getDay();
	console.log(primeiro_dia);

	$scope.dias = [];
	
    $scope.mes_atual = $scope.meses[date.getMonth()]+' '+date.getFullYear();

    for(var i = 0; i <= 4; i++){
    	$scope.dias[i] = [];
    }
    $scope.carregaAgenda = function(){
        var x = 1, y = 1, z = 0;
        for(var i = 0; i <= 34; i++){
        	var ativo = 0;
        	var dia;
        	if(primeiro_dia == 0 && i == 0){
        		ativo = 1;
        		dia = x;
        		x++;
        	}else{
        		if(primeiro_dia == i){
        			ativo = 1;
        			dia = x;
        			x++;
        		}else{
        			if(primeiro_dia >= i+1){
        				dia = dias_mes_anterior - i;
        			}else{
        				if(x <= dias_mes){
    	    				ativo = 1;
    	    				dia = x;
    	    				x++;
    	    			}else{
    	    				dia = y;
    	    				y++;
    	    			}
        			}
        		}
        	}
            if(!ativo){
                var dtmesanterior = new Date(mes_anterior.getFullYear(), mes_anterior.getMonth(), dia);
                var dia_semana = dtmesanterior.getDay();
            }else{
                var dia_semana = new Date(date.getFullYear(), date.getMonth(), dia).getDay();
            }
            var dia_formatado = $sce.trustAsHtml(''+dia+'');
            for(var a = 0; a < $scope.horarios.length; a++){
                if($scope.horarios[a].diasemana == dia_semana){
                    if(ativo){
                        var horario = $scope.horarios[a].horario.split(":");
                        dia_formatado = $sce.trustAsHtml('<strong><span class="badge badge-pill badge-success" data-toggle="tooltip" data-html="true" data-original-title="Aula as <b>'+horario[0]+':'+horario[1]+'</b><br>Professor:<b>'+$scope.horarios[a].professor+'</b>" title>'+dia+'</span></strong>');
                    }
                }
            }
        	$scope.dias[z].push({dia: dia_formatado, ativo: ativo});
        	if((i+1)%7 == 0){
        		z++;
        	}
        	if(i == 34){
                $timeout(function(){
                    $('[data-toggle="tooltip"]').tooltip();
                }, 1000);
        	}
        }
    }

    $scope.carregaHorarios = function(){
        loading.show();
        webRequest.get("aluno/horarios", {}, function(ok){
            loading.hide();
            $scope.horarios = ok.data.data;
            $scope.carregaAgenda();
        }, function(err){
            loading.hide();
            $scope.horarios = [];
            $scope.carregaAgenda();
        });
    }

    $scope.carregaHorarios();
});