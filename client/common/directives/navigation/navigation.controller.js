(function () {

  angular
    .module('packageDelivery')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['functionService', 'toastr'];
  function navigationCtrl(functionService, toastr) {
    var navvm = this;

    navvm.isLoggedIn = functionService.isLoggedIn();

    navvm.currentUser = functionService.currentUser();

    navvm.logout = function(){
		functionService.logout();
			toastr.warning('You have logged out', 'Warning');
    };
  }

})();