(function () {

  angular
    .module('packageDelivery')
    .controller('OrderCtrl', OrderCtrl);

  OrderCtrl.$inject = ['$location', '$scope', 'authentication'];
  function OrderCtrl($location, $scope, authentication) {
    
    $scope.orders = [{
      id: '12442',
      destination: '78 Bel-air Ct, Hollywood',
      progress: '15%',
      express: 'true',
      valuable: '0'
    },
    {
      id: '12443',
      destination: '12 Ballin St, Jimboomba',
      progress: '40%',
      express: 'true',
      valuable: 'true'
    },
    {
      id: '12444',
      destination: '69 Kuakrahm St, Bauls',
      progress: '65%',
      express: 'false',
      valuable: 'true'
    },
    {
      id: '12445',
      destination: '123 Fake St, Springfield',
      progress: '100%',
      express: 'false',
      valuable: 'false'
    }];

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