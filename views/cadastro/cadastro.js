ModifiQAppController.controller('cadastroController', function($scope, $routeParams, $compile, $sce, webRequest, localService, alerta, sessionService, $timeout, $rootScope, $interval, $location, loading){
    var cadastro = sessionService.get("cadastro");
    $scope.passo = $routeParams.passo;
    $scope.meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    $scope.horarios = [];
    // Pega as datas para a agente
    $scope.date = new Date();

    $scope.dias = [];
    
    $scope.mes_atual = $scope.meses[$scope.date.getMonth()];

    $scope.contato = function(){
        var url = 'https://api.whatsapp.com/send/?phone=5511987625217&text&app_absent=0';
        window.open(url, '_blank');
    }

    loading.show();
    webRequest.get("geral/institucional/listar/3", $scope.contato, function(ok){
        loading.hide();
        $scope.institucional = ok.data.data;
    }, function(err){
        loading.hide();
    })

    $scope.simnao = {
        0: 'Não',
        1: 'Sim'
    }
    if(cadastro != undefined){
        $scope.form = cadastro;
    }else{
        $scope.form = {
        	nome: '',
            cpf: '',
            email: '',
            reemail: '',
            senha: '',
            resenha: '',
            whatsapp: '',
            endereco: '',
            numero: '',
            bairro: '',
            complemento: '',
            cidade: '',
            uf: '',
            pais: '',
            cep: '',
            dtnascimento: '',
            plano: '',
            professor: '',
            aceito: false,
            anamnese: {
                praticaatividade: '',
                qualatividade: '',
                tomamedicamento: '',
                qualmedicamento: '',
                fumante: '',
                fumaquantotempo: '',
                hipertensao: '',
                doenca: '',
                qualdoenca: '',
                apresentador: '',
                qualdor: '',
                qualmovimentosentedor: '',
                fezcirurgia: '',
                qualcirurgia: '',
                tempocirurgia: '',
                objetivo: ''
            },
            aula: {
                dia: '',
                diaindex: '',
                mes: '',
                horario: ''
            }
        }
    }
    $scope.continuar = function(passo){
        if(passo == 1){
            if($scope.form.nome == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Nome corretamente!');
                return;
            }else if($scope.form.dtnascimento == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Dt. Nascimento corretamente!');
                return;
            }else if($scope.form.cpf == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo CPF corretamente!');
                return;
            }else if($scope.form.whatsapp == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Whatsapp corretamente!');
                return;
            }else if($scope.form.endereco == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Endereço corretamente!');
                return;
            }else if($scope.form.numero == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Numero corretamente!');
                return;
            }else if($scope.form.bairro == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Bairro corretamente!');
                return;
            }else if($scope.form.cep == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo CEP corretamente!');
                return;
            }else if($scope.form.cidade == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Cidade corretamente!');
                return;
            }else if($scope.form.uf == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo UF corretamente!');
                return;
            }else if($scope.form.pais == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo País corretamente!');
                return;
            }else{
                loading.show();
                sessionService.set("cadastro", $scope.form);
                $timeout(function(){
                    loading.hide();
                    $location.path("/cadastro/2");
                }, 2000);
            }
        }else if(passo == 2){
            if($scope.form.anamnese.hipertensao == ''){
                alerta.show('warning', 'Atenção', 'Selecione o campo Hipertensão!');
                return;
            }else if($scope.form.anamnese.praticaatividade == ''){
                alerta.show('warning', 'Atenção', 'Selecione o campo Pratica Atividade Física!');
                return;
            }else if($scope.form.anamnese.praticaatividade == 1 && $scope.form.anamnese.qualatividade == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Quais Atividades Físicas!');
                return;
            }else if($scope.form.anamnese.fumante == ''){
                alerta.show('warning', 'Atenção', 'Selecione o campo Fumante!');
                return;
            }else if($scope.form.anamnese.fumante == 1 && $scope.form.anamnese.fumaquantotempo == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Fuma há quanto tempo!');
                return;
            }else if($scope.form.anamnese.tomamedicamento == ''){
                alerta.show('warning', 'Atenção', 'Selecione o campo Toma algum medicamento!');
                return;
            }else if($scope.form.anamnese.tomamedicamento == 1 && $scope.form.anamnese.qualmedicamento == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Qual medicamento!');
                return;
            }else if($scope.form.anamnese.doenca == ''){
                alerta.show('warning', 'Atenção', 'Selecione o campo Possui doenca!');
                return;
            }else if($scope.form.anamnese.doenca == 1 && $scope.form.anamnese.qualdoenca == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Qual doença!');
                return;
            }else if($scope.form.anamnese.apresentador == ''){
                alerta.show('warning', 'Atenção', 'Selecione o campo Apresenta alguma dor!');
                return;
            }else if($scope.form.anamnese.apresentador == 1 && $scope.form.anamnese.qualdor == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Qual dor!');
                return;
            }else if($scope.form.anamnese.apresentador == 1 && $scope.form.anamnese.qualmovimentosentedor == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Qual movimento sente dor!');
                return;
            }else if($scope.form.anamnese.fezcirurgia == ''){
                alerta.show('warning', 'Atenção', 'Selecione o campo Já realizou alguma cirurgia!');
                return;
            }else if($scope.form.anamnese.fezcirurgia == 1 && $scope.form.anamnese.qualcirurgia == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Qual cirurgia!');
                return;
            }else if($scope.form.anamnese.fezcirurgia == 1 && $scope.form.anamnese.tempocirurgia == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Tempo da ultima cirurgia!');
                return;
            }else if($scope.form.anamnese.objetivo == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Objetivo!');
                return;
            }else{
                loading.show();
                sessionService.set("cadastro", $scope.form);
                $timeout(function(){
                    loading.hide();
                    $location.path("/cadastro/3");
                }, 2000);
            }
        }else if(passo == 3){
            loading.show();
            sessionService.set("cadastro", $scope.form);
            $timeout(function(){
                loading.hide();
                console.log($scope.form);
                $location.path("/cadastro/4");
            }, 2000);
        }else if(passo == 4){
            loading.show();
            sessionService.set("cadastro", $scope.form);
            $timeout(function(){
                loading.hide();
                console.log($scope.form);
                $location.path("/cadastro/5");
            }, 2000);
        }else if(passo == 5){
            loading.show();
            sessionService.set("cadastro", $scope.form);
            $timeout(function(){
                loading.hide();
                console.log($scope.form);
                $location.path("/cadastro/6");
            }, 2000);
        }else if(passo == 6){
            if($scope.form.email == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Email corretamente!');
                return;
            }else if($scope.form.reemail == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Confirmar Email corretamente!');
                return;
            }else if($scope.form.email != $scope.form.reemail){
                alerta.show('warning', 'Atenção', 'Os emails digitados são diferentes!');
                return;
            }else if($scope.form.senha == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Senha corretamente!');
                return;
            }else if($scope.form.resenha == ''){
                alerta.show('warning', 'Atenção', 'Preencha o campo Confirmar Senha corretamente!');
                return;
            }else if($scope.form.senha != $scope.form.resenha){
                alerta.show('warning', 'Atenção', 'As senhas digitadas são diferentes!');
                return;
            }else{
                loading.show();
                webRequest.post("aluno/cadastro", $scope.form, function(ok){
                    loading.hide();
                    sessionService.destroy("cadastro");
                    alerta.show('success', 'Cadastro efetuado :)', 'Seu cadastro foi efetuado com sucesso!', false, function(){
                        $location.path("/");
                    })
                }, function(err){
                    loading.hide();
                    alerta.show('error','Ops!', err.data.mensagem);
                });
            }
        }
    }
    if($scope.passo == 3){
        loading.show();
        webRequest.get("geral/plano", {}, function(ok){
            loading.hide();
            for(var i = 0; i < ok.data.data.length; i++){
                ok.data.data[i].descricao = $sce.trustAsHtml(ok.data.data[i].descricao);
            }
            $scope.planos = ok.data.data;
        }, function(err){

        });
    } else if($scope.passo == 4){
        loading.show();
        webRequest.get("geral/professor", {}, function(ok){
            loading.hide();
            for(var i = 0; i < ok.data.data.length; i++){
                ok.data.data[i].descricao = $sce.trustAsHtml(ok.data.data[i].descricao);
            }
            $scope.professores = ok.data.data;
        }, function(err){

        });
    } else if($scope.passo == 5){
        loading.show();
        webRequest.get("geral/professor/horarios/"+$scope.form.professor, {}, function(ok){
            loading.hide();
            $scope.horarios = ok.data.data;
            $scope.showContinuar = false;
            $scope.carregaAgenda($scope.date);
        }, function(err){

        });
    }
    $scope.carregaAgenda = function(date){
        $scope.dias = [];
        for(var i = 0; i <= 4; i++){
            $scope.dias[i] = [];
        }
        var dias_mes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        var dias_mes_anterior = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        var first_date = new Date(date.getFullYear(), date.getMonth(), 1);
        var mes_anterior = new Date(date);
        mes_anterior.setMonth(date.getMonth()-1);
        var primeiro_dia = first_date.getDay();
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
                if(a == dia_semana){
                    if(ativo && (dia > date.getDate() || date.getMonth() > $scope.date.getMonth())){
                        var element = '<strong><span class="badge badge-pill badge-success cursor" dia="'+dia+'" diaindex="'+a+'" mes="'+(parseInt(date.getMonth())+1)+'">'+dia+'</span></strong>';
                        dia_formatado = $sce.trustAsHtml(element);
                    }
                }
            }
            $scope.dias[z].push({dia: dia_formatado, ativo: ativo});
            if((i+1)%7 == 0){
                z++;
            }
            if(i == 34){
                $scope.date = date;
                $scope.mes_atual = $scope.meses[date.getMonth()];
                $timeout(function(){
                    $('[data-toggle="tooltip"]').tooltip();
                }, 1000);
            }
        }
    }
    $scope.mesAnterior = function(){
        var dt = new Date();
        if(dt.getMonth() != $scope.date.getMonth()){
            var data = new Date($scope.date.getFullYear(), $scope.date.getMonth()-1, $scope.date.getDate());
            $scope.carregaAgenda(data);
        }
    }
    $scope.proximoMes = function(){
        var dt = new Date();
        var data = new Date($scope.date.getFullYear(), $scope.date.getMonth()+1, $scope.date.getDate());
        $scope.carregaAgenda(data);
    }
    $scope.showHorarios = false;
    $("document,body").on("click", ".cursor", function(){
        var dia = $(this).attr("dia");
        var diaindex = $(this).attr("diaindex");
        var mes = $(this).attr("mes");
        $("td.ativo").removeClass("ativo");
        $(this).parent().parent().attr("class", "ativo");
        //$(".card-footer").show();
        $scope.form.aula.dia = dia;
        $scope.form.aula.diaindex = diaindex;
        $scope.form.aula.mes = mes;
        loading.show();
        $timeout(function(){
            $scope.showHorarios = true;
            loading.hide();
        }, 1000);
    })
    mascaraTipos();
    $scope.voltar = function(){
        if($scope.passo == 1){
            $location.path("/login");
        }else{
            $location.path("/cadastro/"+($scope.passo - 1));
        }
    }
    $scope.setPlano = function(plano){
        $scope.form.plano = plano;
        console.log($scope.form);
        $scope.continuar(3);
    }
    $scope.setProfessor = function(professor){
        $scope.form.professor = professor;
        console.log($scope.form);
        $scope.continuar(4);
    }
});