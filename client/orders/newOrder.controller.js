(function () {

  angular
    .module('packageDelivery')
    .controller('newOrderCtrl', newOrderCtrl);

  newOrderCtrl.$inject = ['$location', '$rootScope','functionService', 'toastr'];
  function newOrderCtrl($location, $rootScope, functionService, toastr) {
    var vm = this;

    vm.isLoggedIn = functionService.isLoggedIn();

    vm.currentUser = functionService.currentUser();

		var streetFull = vm.currentUser.streetNumber + ' ' + vm.currentUser.streetName;

    vm.newOrder = {
			userID: vm.currentUser.email,
			pickUp: streetFull,
			dropOff: '',
			notes: '',
			isFragile: '',
			isExpress: '',
			state: 'new'
    };

    vm.redirect = function(){
      $location.path('orders');
    };

    vm.onSubmit = function () {
      console.log('Placing Order');
      console.log(vm.newOrder);
      functionService
        .placeOrder(vm.newOrder)
        .error(function(err){
					toastr.error(err, 'Error');
        })
        .then(vm.redirect());
    };

  }

})();