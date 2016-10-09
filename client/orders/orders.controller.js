(function () {

  angular
    .module('packageDelivery')
    .controller('OrderCtrl', OrderCtrl);

  OrderCtrl.$inject = ['$location', '$scope', '$rootScope', 'functionService', 'toastr'];
  function OrderCtrl($location, $scope, $rootScope, functionService, toastr) {

    var vm = this;

    vm.isLoggedIn = functionService.isLoggedIn();
    vm.currentUser = functionService.currentUser();

    console.log(vm.currentUser);

		functionService
			.getUserOrders(vm.currentUser.email)
			.error(function(err){
				toastr.warning(err, 'Error');
			})
			.then(function(){
				$location.path('orders');
				//if no orders found, have watermark/empty state view etc
				$scope.orders = functionService.loadOrders();
		});
  }

})();