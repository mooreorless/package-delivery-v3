(function() {

	angular
		.module('packageDelivery')
		.controller('DashBoardCtrl', DashBoardCtrl);

	DashBoardCtrl.$inject = ['$location', 'functionService', 'toastr'];
	function DashBoardCtrl($location, functionService, toastr) {

		var vm = this;

		var date = new Date();
		vm.currentDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

		// Get drivers to then be assigned
		functionService.getAllDrivers()
			.then(function() {
				vm.drivers = functionService.loadDrivers();
			});

		functionService.getCurrentOrders()
			.then(function() {
				vm.orders = functionService.loadOrders();
				vm.currentOrderCount = vm.orders.length;
			})
			.then(function() {
				vm.deliveredOrderCount = vm.orders.length - Math.floor((Math.random() * 20) + 1);
			})
			.then(function() {
				vm.awaitingOrderCount = vm.orders.length;
			})
	}


})();