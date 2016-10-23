(function () {

	angular
		.module('packageDelivery')
		.controller('singleOrderCtrl', singleOrderCtrl);

	singleOrderCtrl.$inject = ['$location', '$rootScope', '$routeParams', '$route', 'functionService', 'NgMap', 'toastr'];
	function singleOrderCtrl($location, $rootScope, $routeParams, $route, functionService, NgMap, toastr) {

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

		vm.validatePaymentDetails = function(){
			var cardNumberValue = vm.cardNumber.replace(/-/g, "");
			var cardNumberValue = cardNumberValue.replace(/ /g, "");
			var cardFormat = /[0-9]{16}/;
			var cvvFormat = /[0-9]{3}/;
			var expiryFormat = /[0-1][1-9]\/[1-9][0-9]/;
			var containsLetters = /[a-z]+[A-Z]+/;

			if (cardFormat.test(cardNumberValue) && cardNumberValue.length == 16 && cvvFormat.test(vm.cardCVV)
					&& vm.cardCVV.length == 3 && expiryFormat.test(vm.cardExp) && vm.cardExp.length == 5){
				return true;
			} else {
				toastr.error('Invalid Payment Details', 'Error');
				toastr.hidden('Hidden', 'Hidden');
				return false;
			}
		}

		vm.updateJobState = function(newState){
			if (newState == 'Paid'){
				if(!vm.validatePaymentDetails()){
					return false;
				}
			}

			update = {
				_id: vm.orderID,
				state: newState,
				pickedUpAt: vm.order.pickedUpAt,
				droppedOffAt: vm.order.droppedOffAt,
				paidAt: vm.order.paidAt
			};
		
			if (newState.toLowerCase().replace(' ', '') == 'pickedup'){
				update.pickedUpAt = Date.now();
			} else if (newState.toLowerCase().replace(' ', '') == 'droppedoff'){
				update.droppedOffAt = Date.now();
			} else 	if (newState.toLowerCase().replace(' ', '') == 'paid'){
				update.paidAt = Date.now();
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