(function () {

	angular
		.module('packageDelivery')
		// TODO
		.controller('updateUserCtrl', updateUserCtrl);

	updateUserCtrl.$inject = ['$location', 'functionService', 'toastr'];
	function updateUserCtrl($location, functionService, toastr) {

		var vm = this;
		vm.isLoggedIn = functionService.isLoggedIn();
		vm.currentUser = functionService.currentUser();

		console.log(vm.currentUser.lastName);
		console.log(vm.currentUser);
		// Update user object
		vm.newCredentials = {
			firstName : vm.currentUser.name,
			lastName : vm.currentUser.lastName,
			email : vm.currentUser.email,
			streetNumber: vm.currentUser.streetNumber,
			streetName: vm.currentUser.streetName,
			suburb: vm.currentUser.suburb,
			postCode: vm.currentUser.postCode
		};

		// Old object used to pre-fill
		vm.credentials = {
			firstName : vm.currentUser.name,
			lastName : vm.currentUser.lastName,
			email : vm.currentUser.email,
			streetNumber: vm.currentUser.streetNumber,
			streetName: vm.currentUser.streetName,
			suburb: vm.currentUser.suburb,
			postCode: vm.currentUser.postCode
		};

		vm.updateUser = function(){
			// console.log();
			functionService.updateUser(vm.newCredentials);
			$location.path('profile');
			toastr.success('Updated account details', 'Success');
		}
	}

})();