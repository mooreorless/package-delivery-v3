(function () {

  angular
    .module('packageDelivery')
    .controller('OrderCtrl', OrderCtrl);

  OrderCtrl.$inject = ['$location', '$scope', '$rootScope', 'functionService'];
  function OrderCtrl($location, $scope, $rootScope, functionService) {

    var vm = this;

    vm.isLoggedIn = functionService.isLoggedIn();

    vm.currentUser = functionService.currentUser();

 

    // console.log(vm.currentUser);

    // functionService.getUserOrders(vm.currentUser.email);

        functionService
        .getUserOrders(vm.currentUser.email)
        .error(function(err){
          if (err){
          alert(err);
          }
        })
        .then(function(){
          $location.path('orders');
          console.log('finished getting orders');
          $scope.orders = functionService.loadOrders();
        });

  //   vm.newOrder = {
		// userID: vm.currentUser.email,
		// pickUp: '',
		// dropOff: '',
		// notes: '',
		// isFragile: '',
		// isExpress: '',
		// state: 'new'
  //   };



  //   vm.onSubmit = function () {
  //     console.log('Placing Order');
  //     console.log(vm.newOrder);
  //     functionService
  //       .placeOrder(vm.newOrder)
  //       .error(function(err){
  //         alert(err);
  //       })
  //       .then(function(){
  //         $location.path('orders');
  //       });
  //   };

  }

})();