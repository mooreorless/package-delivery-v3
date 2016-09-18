(function () {

  angular
    .module('packageDelivery')
    .controller('ordersCtrl', ordersCtrl);

  ordersCtrl.$inject = ['$location','authentication'];
  function ordersCtrl($location, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.newOrder 

  }

})();