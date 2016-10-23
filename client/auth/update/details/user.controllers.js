/*
 Controller for the user
 */
(function () {

	angular
		.module('packageDelivery')
		.controller('updateUserCtrl', updateUserCtrl);

	updateUserCtrl.$inject = ['$location', 'functionService', 'toastr'];
	/*
	 Updates the user with new crendtials or keeps the old ones
	 */
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

		/*
		 When the user submits the, do all validation and transport data given to the back end
		 */
		vm.onSubmit = function () {
			console.log('Submitting update user details');
			console.log(vm.credentials);
			functionService
				.register(vm.credentials)
				.error(function(err){
					alert(err);
				})
				.then(function(){
					$location.path('profile');
				});
		};
		/*
		 	Takes the user to the update user details page
		 */

		vm.updateUser = function(){
			functionService.updateUser(vm.newCredentials);
			$location.path('/profile');
		}
	}

})();