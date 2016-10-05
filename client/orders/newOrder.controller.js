(function () {

  angular
    .module('packageDelivery')
    .controller('newOrderCtrl', newOrderCtrl);

  newOrderCtrl.$inject = ['$location', '$rootScope','functionService'];
  function newOrderCtrl($location, $rootScope, functionService) {
    var vm = this;

    vm.isLoggedIn = functionService.isLoggedIn();

    vm.currentUser = functionService.currentUser();

    vm.newOrder = {
			userID: vm.currentUser.email,
			pickUp: '',
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
          if (err){
            alert(err);
          }
        })
        .then(vm.redirect());
    };

  }

})();