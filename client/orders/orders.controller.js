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
		if (functionService.loggedInUserType() === 'driver'){
			vm.ordersMessage = 'Displaying all orders assigned to you ' + vm.currentUser.firstName;
		}
		else if (functionService.loggedInUserType() === 'customer') {
			vm.ordersMessage = 'Displaying all orders placed by you ' + vm.currentUser.firstName;
		} else {
			vm.ordersMessage = 'Displaying all orders';
		}
	})
	.error(function (e) {
		toastr.error('Please sign in or make an account', 'Error');
		$location.path('/');
	})
	.then(function(){
		functionService
		.getUserOrders(vm.currentUser)
		.error(function(err){
			toastr.warning(err, 'Error');
		})
		.then(function(){
			//if no orders found, have watermark/empty state view etc
			vm.orders = functionService.loadOrders();
			vm.newOrderCount = 0;
			if (functionService.loggedInUserType() == 'driver'){
				vm.orders.forEach(function(item, index){
					if (item.seenByDriver === false){
						vm.newOrderCount++;
						vm.orders[index].panelClass = 'panel panel-warning';
					}
					else{
						vm.orders[index].panelClass = 'panel panel-default';
					}
				});
			}
			else{
				vm.orders.forEach(function(item, index){
					vm.orders[index].panelClass = 'panel panel-default';
				});
			}
		});
	});

    vm.openOrder = function(order){
      console.log(order);
      $location.path('order/' + order._id);
    };
  }

})();