(function (angular) {
    'use strict';
    angular
        .module('imobiliaria', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: '/app/spas/imobiliaria/imobiliaria.tpl.html',
                        controller: 'imobiliariaController as vm'
                    })                  
                    .otherwise({
                        redirectTo: '/'
                    });
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });
            }
        ]);
})(angular);