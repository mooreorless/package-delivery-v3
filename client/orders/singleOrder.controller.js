(function () {

	angular
		.module('packageDelivery')
		.controller('singleOrderCtrl', singleOrderCtrl);

	singleOrderCtrl.$inject = ['$location', '$rootScope', '$routeParams', '$route', 'functionService', 'NgMap'];
	function singleOrderCtrl($location, $rootScope, $routeParams, $route, functionService, NgMap) {

		var vm = this;

		var date = new Date();
		vm.currentDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

		vm.loggedInUserType = functionService.loggedInUserType;

		//get order ID from route parameters 
		vm.orderID = $routeParams.orderID;

		
		//variable to help with page layout during different job states
		vm.googleMapsUrl = '<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0ZemKOuENUDXYGs4GVAVIbkPs3vyqJXA"></script>';

		functionService
		.getSingleOrder(vm.orderID)
		.error(function(err){
			if (err){
			alert(err);
			}
		})
		.then(function(){
			vm.order = functionService.loadSingleOrder();
			if (vm.order.pickedUpAt) {
				vm.pickedUpAtStatus = 'complete';
			} 
			if (vm.order.droppedOffAt) {
				vm.droppedOffAtStatus = 'complete';
			}
			if (vm.order.paidAtStatus) {
				vm.paidAtStatus = 'complete';
			}
		}).then(function(){
			//do some logic to get our view variables
			vm.pickUpAddress = vm.order.pickUpNumber+' '+vm.order.pickUpName+' '+vm.order.pickUpSuburb+' '+vm.order.pickUpPostcode;
			vm.dropOffAddress = vm.order.dropOffNumber+' '+vm.order.dropOffName+' '+vm.order.dropOffSuburb+' '+vm.order.dropOffPostcode;
			vm.state = vm.order.state;
			// Driver name
			vm.driverName = (vm.order.driver).charAt(0).toUpperCase() + vm.order.driver.slice(1);
			//if we are logged in as a driver, set isSeen to true on order object
			if (vm.loggedInUserType() == 'driver' && vm.order.seenByDriver === false){
				console.log('calling mark job as seen');
				functionService.markJobAsSeen({_id : vm.order._id});
			}
		});

		NgMap.getMap();

		vm.updateJobState = function(newState){
			update = {
				_id: vm.orderID,
				state: newState,
				pickedUpAt: vm.order.pickedUpAt,
				droppedOffAt: vm.order.droppedOffAt,
				paidAt: vm.order.paidAt
			};
		
			if (newState.toLowerCase().replace(' ', '') == 'pickedup'){
				update.pickedUpAt = Date.now();
				console.log('Picked Up Selected');
			} else if (newState.toLowerCase().replace(' ', '') == 'droppedoff'){
				update.droppedOffAt = Date.now();
				console.log('Dropped Off Selected');
			} else 	if (newState.toLowerCase().replace(' ', '') == 'paid'){
				update.paidAt = Date.now();
				console.log('Paid At Selected');
				//todo format date
			};

			functionService.updateJobState(update).then(function(){
				functionService
				.getSingleOrder(vm.orderID)
				.error(function(err){
					if (err){
						alert(err);
					}
				})
				.then(function(){
					vm.order = functionService.loadSingleOrder();					
				})
				.then(function(){
					$route.reload();
				});
			});
		};
	}
})();