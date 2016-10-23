(function() {

	angular
		.module('packageDelivery')
		.controller('DashBoardCtrl', DashBoardCtrl);

	DashBoardCtrl.$inject = ['$location', '$route', 'functionService', 'toastr', 'NgMap'];
	function DashBoardCtrl($location, $route, functionService, toastr, NgMap ) {

		var vm = this;

		var date = new Date();
		vm.currentDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
		vm.selectedDriver = 'Select Driver';

		// Get drivers to then be assigned
		functionService.getAllDrivers()
			.then(function() {
				vm.drivers = functionService.loadDrivers();
			});

		vm.assignDriver = function(driver) {
			var toBeAssigned = {
				_id: driver._id,
				driverName: driver.driverName.toLowerCase()
			};
			functionService.assignDriver(toBeAssigned);
			// $route.reload();
		};

		// Populates all orders
		functionService.getCurrentOrders()
			.then(function() {
				vm.orders = functionService.loadOrders();
				vm.allOrders = functionService.loadOrders();
				vm.currentOrderCount = vm.orders.length;
			});

		// Delivered orders
		functionService.getDeliveredOrders()
			.then(function() {
				vm.orders = functionService.loadOrders();
				vm.deliveredOrderCount = vm.orders.length;
			});

		// Orders waiting
		functionService.getPlacedOrders()
			.then(function() {
				vm.orders = functionService.loadOrders();
				vm.awaitingOrderCount = vm.orders.length;
			});

		NgMap.getMap().then(function(map) {
			// console.log(map.getCenter());
			// console.log('markers', map.markers);
			// console.log('shapes', map.shapes);
		});
	}
})();