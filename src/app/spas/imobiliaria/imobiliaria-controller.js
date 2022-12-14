(function (angular) {
    angular
        .module('imobiliaria')
        .controller('imobiliariaController', imobiliariaController);

        imobiliariaController.$inject = ['$scope', '$http', 'imobiliariaService'];

        function imobiliariaController($scope, $http, imobiliariaService) {
            var vm = this;
            vm.init = init;
            
            function init() {
                vm.titulo = "Modelo de Estrutura de Imobiliária";
            }
        }
})(angular);