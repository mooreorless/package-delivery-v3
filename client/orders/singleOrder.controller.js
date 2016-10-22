(function () {

	angular
		.module('packageDelivery')
		.controller('singleOrderCtrl', singleOrderCtrl);

	singleOrderCtrl.$inject = ['$location', '$rootScope', '$routeParams', '$route', 'functionService', 'NgMap'];
	function singleOrderCtrl($location, $rootScope, $routeParams, $route, functionService, NgMap) {

		var vm = this;
		vm.loggedInUserType = functionService.loggedInUserType;
		if (vm.loggedInUserType() == 'customer'){
			vm.panelClass = 'col-md-8 col-md-offset-2';
		}
		else{
			vm.panelClass = 'col-md-8';
		}
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
		}).then(function(){
			//do some logic to get our view variables
			vm.pickUpAddress = vm.order.pickUpNumber+' '+vm.order.pickUpName+' '+vm.order.pickUpSuburb+' '+vm.order.pickUpPostcode;
			vm.dropOffAddress = vm.order.dropOffNumber+' '+vm.order.dropOffName+' '+vm.order.dropOffSuburb+' '+vm.order.dropOffPostcode;
			vm.state = vm.order.state;

			console.log(vm.order);
			console.log(vm.pickUpAddress);
		});

		NgMap.getMap().then(function(map) {
			console.log(map.getCenter());
			console.log('markers', map.markers);
			console.log('shapes', map.shapes);
		});

		vm.updateJobState = function(newState){
			console.log('dropdown changed');
			console.log(newState);
			console.log(vm.orderID);
			update = {
				_id: vm.orderID,
				state: newState,
			};
			functionService.updateJobState(update);
		};

	}
})();