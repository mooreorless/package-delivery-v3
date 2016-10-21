(function () {

  angular
    .module('packageDelivery')
    .controller('OrderCtrl', OrderCtrl);

  OrderCtrl.$inject = ['$location', '$rootScope', 'meanData', 'functionService', 'toastr'];
  function OrderCtrl($location, $rootScope, meanData, functionService, toastr) {

    var vm = this;
    vm.currentUser = {};
    vm.ordersMessage = '';

    vm.isLoggedIn = functionService.isLoggedIn();
    
	meanData.getProfile()
	.success(function(data) {
		vm.currentUser = data;
		console.log('logging user from meanData');
		console.log(vm.currentUser.firstName);
		if (functionService.loggedInUserType == 'driver'){
			vm.ordersMessage = 'Displaying all orders assigned to you ' + vm.currentUser.firstName;
		}
		else {
			vm.ordersMessage = 'Displaying all orders placed by you ' + vm.currentUser.firstName;
		}
		console.log('finished logging from meanData');
	})
	.error(function (e) {
		toastr.error('Please sign in or make an account', 'Error');
		$location.path('/');
		console.log(e);
	})
	.then(function(){
		functionService
		.getUserOrders(vm.currentUser)
		.error(function(err){
			toastr.warning(err, 'Error');
		})
		.then(function(){
			$location.path('orders');
			//if no orders found, have watermark/empty state view etc
			vm.orders = functionService.loadOrders();
		});
	});
    
	



    vm.openOrder = function(order){
      console.log(order);
      $location.path('order/' + order._id);
    };
  }

})();