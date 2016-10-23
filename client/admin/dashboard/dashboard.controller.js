(function() {

	angular
		.module('packageDelivery')
		.controller('DashBoardCtrl', DashBoardCtrl);

	DashBoardCtrl.$inject = ['$location', '$route', 'functionService', 'toastr'];
	function DashBoardCtrl($location, $route, functionService, toastr) {

		var vm = this;

		var date = new Date();
		vm.currentDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

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
			// Checks if driver has too many jobs
			functionService.getJobCountForDriver(toBeAssigned.driverName)
				.then(function() {
					vm.jobs = functionService.loadOrders();

					if (vm.jobs.length > 5) {
						toastr.warning('This driver has too many jobs, please select another', 'Warning');
					} else {
						functionService.assignDriver(toBeAssigned);
					}
				})
		};

		// Populates all orders
		functionService.getCurrentOrders()
			.then(function() {
				vm.orders = functionService.loadOrders();
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
	}
})();