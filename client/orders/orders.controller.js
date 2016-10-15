(function () {

  angular
    .module('packageDelivery')
    .controller('OrderCtrl', OrderCtrl);

  OrderCtrl.$inject = ['$location', '$rootScope', 'functionService'];
  function OrderCtrl($location, $rootScope, functionService) {

    var vm = this;

    vm.isLoggedIn = functionService.isLoggedIn();

    vm.currentUser = functionService.currentUser();

    vm.ordersMessage = '';
 
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
      vm.orders = functionService.loadOrders();
    });

    emailDomain = vm.currentUser.email.split('@');

    if ((emailDomain[1] == 'onthespot.com') && (emailDomain[0] != 'admin')){
      vm.ordersMessage = 'Displaying all orders assigned to you (' + vm.currentUser.name + ')';
    }
    else{
      vm.ordersMessage = 'Displaying all orders placed by you (' + vm.currentUser.name + ')';
    }

    vm.openOrder = function(order){
      console.log(order);
      $location.path('order/' + order._id);
    };

    vm.test = function(){
      console.log('test');
    };

  }

})();