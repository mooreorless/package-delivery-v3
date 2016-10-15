(function () {

  angular
    .module('packageDelivery')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','functionService'];
  function navigationCtrl($location, functionService) {
    var navvm = this;

    navvm.isLoggedIn = functionService.isLoggedIn();

    navvm.currentUser = functionService.currentUser();

    navvm.logout = function(){
      functionService.logout();
    };
  }

})();