(function () {

  angular
    .module('packageDelivery')
    .controller('OrderCtrl', OrderCtrl);

  OrderCtrl.$inject = ['$location', '$scope', '$rootScope', 'functionService', 'toastr'];
  function OrderCtrl($location, $scope, $rootScope, functionService, toastr) {

    var vm = this;

    vm.isLoggedIn = functionService.isLoggedIn();
    vm.currentUser = functionService.currentUser();
    
		$scope.ordersMessage = '';

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

		var userEmail = vm.currentUser.email.split('@');

		if ((userEmail[1] == 'onthespot.com') && (userEmail[0] != 'admin')){
			$scope.ordersMessage = 'Displaying all orders assigned to you ' + vm.currentUser.name;
		}
		else {
			$scope.ordersMessage = 'Displaying all orders placed by you ' + vm.currentUser.name;
		}

    vm.openOrder = function(order){
      console.log(order);
      $location.path('order/' + order._id);
    };
  }

})();