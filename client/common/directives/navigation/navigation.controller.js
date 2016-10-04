(function () {

  angular
    .module('packageDelivery')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','functionService'];
  function navigationCtrl($location, functionService) {
    var vm = this;

    vm.isLoggedIn = functionService.isLoggedIn();

    vm.currentUser = functionService.currentUser();

    var logout = function(){
		functionService.logout();
		console.log('logging out');
    };

  }

})();