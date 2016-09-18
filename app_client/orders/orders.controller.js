(function () {

  angular
    .module('packageDelivery')
    .controller('OrderCtrl', OrderCtrl);

  OrderCtrl.$inject = ['$location','functionService'];
  function OrderCtrl($location, functionService) {
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

    vm.onSubmit = function () {
      console.log('Placing Order');
      console.log(vm.newOrder);
      functionService
        .placeOrder(vm.newOrder)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('orders');
        });
    };

  }

})();