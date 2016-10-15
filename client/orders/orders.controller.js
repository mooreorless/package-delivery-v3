(function () {

  angular
    .module('packageDelivery')
    .controller('OrderCtrl', OrderCtrl);

  OrderCtrl.$inject = ['$location', '$rootScope', 'functionService', 'toastr'];
  function OrderCtrl($location, $rootScope, functionService, toastr) {

    var vm = this;

    vm.isLoggedIn = functionService.isLoggedIn();
    vm.currentUser = functionService.currentUser();
    
		vm.ordersMessage = '';

		functionService
			.getUserOrders(vm.currentUser.email)
			.error(function(err){
				toastr.warning(err, 'Error');
			})
			.then(function(){
				$location.path('orders');
				//if no orders found, have watermark/empty state view etc
				vm.orders = functionService.loadOrders();
		});

		var userEmail = vm.currentUser.email.split('@');

		if ((userEmail[1] == 'onthespot.com') && (userEmail[0] != 'admin')){
			vm.ordersMessage = 'Displaying all orders assigned to you ' + vm.currentUser.name;
		}
		else {
			vm.ordersMessage = 'Displaying all orders placed by you ' + vm.currentUser.name;
		}

    vm.openOrder = function(order){
      console.log(order);
      $location.path('order/' + order._id);
    };
  }

})();