(function () {

    angular
        .module('packageDelivery')
        .controller('labelCtrl', labelCtrl);

    labelCtrl.$inject = ['$location', '$rootScope', '$routeParams', '$route', 'functionService', 'NgMap'];
    function labelCtrl($location, $rootScope, $routeParams, $route, functionService, NgMap) {

        var vm = this;
        //get order ID from route parameters
        vm.orderID = $routeParams.orderID;

        functionService
            .getSingleOrder(vm.orderID)
            .error(function (err) {
                if (err) {
                    alert(err);
                }
            })
            .then(function () {
                vm.order = functionService.loadSingleOrder();
            }).then(function () {
            //do some logic to get our view variables
            vm._id = vm.order._id;
            console.log(vm);
            vm.pickUpAddress = vm.order.pickUpNumber + ' ' + vm.order.pickUpName + ' ' + vm.order.pickUpSuburb + ' ' + vm.order.pickUpPostcode;
            vm.dropOffAddress = vm.order.dropOffNumber + ' ' + vm.order.dropOffName + ' ' + vm.order.dropOffSuburb + ' ' + vm.order.dropOffPostcode;
        });

    }
})();