(function (angular) {
    angular
        .module('imobiliaria')
        .factory('imobiliariaService', imobiliariaService);

        imobiliariaService.$inject = ['$http'];

        function imobiliariaService($http) {
            return {
                consultarUsuariosCadastrados: function() {
                    return $http.get('/app/spas/imobiliaria/json/dados-login.json').then(function(response) {
                        return response.data;
                    });
                },
                listarImoveis: function() {
                    return $http.get('/app/spas/imobiliaria/json/dados-imobiliaria.json').then(function(response) {
                        return response.data;
                    });
                },
            };
        }
})(angular);