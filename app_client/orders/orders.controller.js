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

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.newOrder 

  }

})();