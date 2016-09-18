(function () {

  angular
    .module('packageDelivery')
    .controller('newOrderCtrl', newOrderCtrl);

  newOrderCtrl.$inject = ['$location','functionService'];
  function newOrderCtrl($location, functionService) {
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
          if (err){
            alert(err);
          }
        })
        .then(function(){
          console.log('calling new order callback');
          $location.path('orders');
        });
    };

  }

})();