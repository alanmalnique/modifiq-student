ModifiQApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        url: '/',
        cache: false,
        templateUrl: 'views/login/login.html',
        controller: 'loginController'
    }).when('/cadastro/:passo', {
        url: '/cadastro/:passo',
        cache: false,
        templateUrl: 'views/cadastro/cadastro.html',
        controller: 'cadastroController'
    }).when('/dashboard', {
        url: '/dashboard',
        cache: false,
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'dashboardController'
    }).when('/agenda', {
        url: '/agenda',
        cache: false,
        templateUrl: 'views/agenda/agenda.html',
        controller: 'agendaController'
    }).when('/registro-evolutivo', {
        url: '/registro-evolutivo',
        cache: false,
        templateUrl: 'views/registro-evolutivo/registro-evolutivo.html',
        controller: 'registroEvolutivoController'
    }).when('/mensalidade', {
        url: '/mensalidade',
        cache: false,
        templateUrl: 'views/mensalidade/mensalidade.html',
        controller: 'mensalidadeController'
    }).when('/contato', {
        url: '/contato',
        cache: false,
        templateUrl: 'views/contato/contato.html',
        controller: 'contatoController'
    }).when('/redes-sociais', {
        url: '/redes-sociais',
        cache: false,
        templateUrl: 'views/redes-sociais/redes-sociais.html',
        controller: 'redesSociaisController'
    }).when('/regulamento', {
        url: '/regulamento',
        cache: false,
        templateUrl: 'views/regulamento/regulamento.html',
        controller: 'regulamentoController'
    }).when('/perfil', {
        url: '/perfil',
        cache: false,
        templateUrl: 'views/perfil/perfil.html',
        controller: 'perfilController'
    }).when('/logout', {
        url: '/logout',
        template: '',
        controller: function(sessionService, localService, $location){
            sessionService.destroy("usuario");
            localService.destroy("usuario");
            $location.path("/");
        }
    }).otherwise({redirectTo: '/'});;
});